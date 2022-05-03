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
  return Number.parseFloat(num.toFixed(3));
};

type FieldType = {
  variant: 'text' | 'checkbox' | 'number';
  top: number;
  left: number;
  title: string;
  w: number;
};

type Fields = Record<string, FieldType>;

export const ImageCordFinder = () => {
  const [imgSrc, setImgSrc] = useState('');
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
    setBoxes({ ...boxes, [id]: { ...boxes[id], left, top } });
  };

  const imgSrcSet = (src: string) => {
    setImgSrc(src);
  };

  const addField = (id: string, fieldVariant: FieldType['variant']) => {
    setBoxes({
      ...boxes,
      [id]: {
        variant: fieldVariant,
        top: window.scrollY,
        left: 50,
        title: id,
        w: fieldVariant === 'checkbox' ? 25 : 250,
      },
    });
  };

  const onFieldWidthChange = (id: string, newWidth: number) => {
    setBoxes((boxes) => ({ ...boxes, [id]: { ...boxes[id], w: newWidth } }));
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
        x: fixNumber(left / imageWidth),
        y: fixNumber(top / imageHeight),
        w: fixNumber(w / imageWidth),
        type: variant,
      };
    });
    console.log(config);
  };

  return (
    <Wrapper>
      <Controls
        onAddField={addField}
        onGenerateConfig={generateConfig}
        onImgSrcSet={imgSrcSet}
      />

      <ImageWrapper>
        <Image id="referenceImage" ref={drop} src={imgSrc} alt="" />
        {Object.keys(boxes).map((key) => {
          const { left, top, title, w: width, variant } = boxes[key];
          if (variant === 'checkbox') {
            return (
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
          }
          return (
            <DragField
              onDelete={() => {
                deleteField(key);
              }}
              key={key}
              id={key}
              left={left}
              top={top}
              w={width}
              widthChange={onFieldWidthChange}
            >
              {title}
            </DragField>
          );
        })}
      </ImageWrapper>
    </Wrapper>
  );
};
