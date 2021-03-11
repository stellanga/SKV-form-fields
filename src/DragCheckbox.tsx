import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from './ItemTypes';

const ChildrenWrapper = styled.div`
  display: none;
  padding: 0.25rem 1rem;
`;

const Box = styled.div`
  position: absolute;
  height: 26px;
  display: flex;
  border: 0;
  background-color: orange;
  cursor: move;

  &:hover ${ChildrenWrapper} {
    display: block;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid white;
`;

export interface DragCheckboxProps {
  id: any;
  left: number;
  top: number;
  children: React.ReactNode;
  onDelete: () => void;
}

export const DragCheckbox = ({
  id,
  left,
  top,
  onDelete,
  children,
}: DragCheckboxProps) => {
  const [, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box ref={drag} style={{ left, top }}>
      <Icon
        onClick={() => {
          onDelete();
        }}
      >
        <i className="material-icons">clear</i>
      </Icon>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Box>
  );
};
