import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from './ItemTypes';

const Box = styled.div`
  position: absolute;
  display: flex;
  border: 0;
  background-color: orange;
  cursor: move;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid white;
`;

const ChildrenWrapper = styled.div`
  padding: 0.25rem 1rem;
`;

export interface DragFieldProps {
  id: any;
  left: number;
  top: number;
  w: number;
  children: React.ReactNode;
  onDelete: () => void;
  widthIncrease: () => void;
  widthDecrease: () => void;
}

export const DragField = ({
  id,
  left,
  top,
  w,
  widthIncrease,
  widthDecrease,
  onDelete,
  children,
}: DragFieldProps) => {
  const [, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box ref={drag} style={{ left, top, width: `${w}px` }}>
      <Icon
        onClick={() => {
          onDelete();
        }}
      >
        <i className="material-icons">clear</i>
      </Icon>
      <Icon onClick={widthIncrease}>
        <i className="material-icons">add</i>
      </Icon>
      <Icon onClick={widthDecrease}>
        <i className="material-icons">remove</i>
      </Icon>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Box>
  );
};
