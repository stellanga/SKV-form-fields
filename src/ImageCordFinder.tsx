import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop, XYCoord } from 'react-dnd';
import { DragField } from './DragField';
import update from 'immutability-helper';
import type { DragItem } from './interfaces';
import { ItemTypes } from './ItemTypes';
import { Controls } from './Controls';
import { DragCheckbox } from './DragCheckbox';

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

type FieldType = {
  variant: 'field' | 'checkbox';
  top: number;
  left: number;
  title: string;
  w: number;
};

type Fields = Record<string, FieldType>;

export const ImageCordFinder = () => {
  const [boxes, setBoxes] = useState<Fields>({});

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveBox(item.id, left, top);
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

  const addField = (id: string) => {
    setBoxes({
      ...boxes,
      [id]: { variant: 'field', top: 0, left: 0, title: id, w: 250 },
    });
  };
  const addCheckbox = (id: string) => {
    setBoxes({
      ...boxes,
      [id]: { variant: 'checkbox', top: 0, left: 0, title: id, w: 25 },
    });
  };

  const increaseFieldWidth = (id: string) => {
    setBoxes({ ...boxes, [id]: { ...boxes[id], w: boxes[id].w + 10 } });
  };

  const decreaseFieldWidth = (id: string) => {
    setBoxes({ ...boxes, [id]: { ...boxes[id], w: boxes[id].w - 10 } });
  };

  const deleteField = (id: string) => {
    const newBoxes = Object.keys(boxes).reduce((prev, key) => {
      return key !== id ? { ...prev, [key]: boxes[key] } : prev;
    }, {});
    setBoxes(newBoxes);
  };

  const generateConfig = () => {
    const refImage = document.getElementById('referenceImage');
    if (!refImage) return;
    const imageWidth = refImage.offsetWidth;
    const imageHeight = refImage.offsetHeight;
    const config = Object.keys(boxes).map((key) => {
      const { left, top, w, variant } = boxes[key];
      return {
        id: key,
        xPosPercent: fixNumber(left / imageWidth),
        yPosPercent: fixNumber(top / imageHeight),
        widthPercent: fixNumber(w / imageWidth),
        variant,
      };
    });
    console.log(config);
  };

  return (
    <Wrapper>
      <Controls
        onAddField={addField}
        onAddCheckbox={addCheckbox}
        onGenerateConfig={generateConfig}
      />

      <ImageWrapper>
        <Image
          id="referenceImage"
          ref={drop}
          src="https://agoy-assets20200723124850670400000001.s3-eu-west-1.amazonaws.com/skv/2002/2020-01-01-2020-12-31/printable-0.jpg"
          alt=""
        />
        {Object.keys(boxes).map((key) => {
          const { left, top, title, w: width, variant } = boxes[key];
          return variant === 'field' ? (
            <DragField
              onDelete={() => {
                deleteField(key);
              }}
              key={key}
              id={key}
              left={left}
              top={top}
              w={width}
              widthIncrease={() => {
                increaseFieldWidth(key);
              }}
              widthDecrease={() => {
                decreaseFieldWidth(key);
              }}
            >
              {title}
            </DragField>
          ) : (
            <DragCheckbox
              onDelete={() => {
                deleteField(key);
              }}
              key={key}
              id={key}
              left={left}
              top={top}
            >
              {title}
            </DragCheckbox>
          );
        })}
      </ImageWrapper>
    </Wrapper>
  );
};
