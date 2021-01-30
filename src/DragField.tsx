import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from './ItemTypes';

const Box = styled.div`
  position: absolute;
  border: 0;
  background-color: orange;
  padding: 0.5rem 1rem;
  cursor: move;
`;

export interface DragFieldProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  children: React.ReactNode;
}

export const DragField = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
}: DragFieldProps) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <Box ref={drag} style={{ left, top }}>
      {children}
    </Box>
  );
};
