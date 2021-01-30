import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop, XYCoord } from 'react-dnd';
import { DragField } from './DragField';
import update from 'immutability-helper';
import type { DragItem } from './interfaces';
import { ItemTypes } from './ItemTypes';
import { Controls } from './Controls';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 2rem 0;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  cursor: crosshair;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
`;

const fixNumber = (num: Number) => {
  return num.toFixed(3);
};

export const ImageCordFinder = () => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number;
      left: number;
      title: string;
    };
  }>({});

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveBox(item.id, left, top);
      //console.log(top, item.top, monitor.getSourceClientOffset())
      console.log('***', left, top);
      return undefined;
    },
  });

  const moveBox = (id: string, left: number, top: number) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top },
        },
      }),
    );
  };

  const [xPos, setXPos] = useState(0);
  const [xPosPercent, setXPosPercent] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [yPosPercent, setYPosPercent] = useState(0);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const imageWidth = event.currentTarget.offsetWidth;
    const imageHeight = event.currentTarget.offsetHeight;

    let cX = event.clientX - event.currentTarget.offsetLeft;
    let cY = event.clientY - event.currentTarget.offsetTop;

    if (document.documentElement.scrollTop > 0) {
      cY = cY + document.documentElement.scrollTop;
    }

    setXPos(cX);
    setXPosPercent(cX / imageWidth);
    setYPos(cY);
    setYPosPercent(cY / imageHeight);
  };

  const addField = (id: string) => {
    console.log(Object.keys(boxes));
    setBoxes({ ...boxes, [id]: { top: 0, left: 0, title: id } });
  };

  return (
    <Wrapper>
      <Controls onAddField={addField} />

      <ImageWrapper>
        <Image
          ref={drop}
          onClick={onClick}
          src="https://agoy-assets20200723124850670400000001.s3-eu-west-1.amazonaws.com/skv/2002/2020-01-01-2020-12-31/printable-0.jpg"
          alt=""
        />
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          return (
            <DragField key={key} id={key} left={left} top={top}>
              {title}
            </DragField>
          );
        })}
      </ImageWrapper>
    </Wrapper>
  );
};
