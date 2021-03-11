import React, { useState } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: fixed;
  top: 4rem;
  right: 0;
  display: flex;
  z-index: 1;
`;

const Toggle = styled.div`
  position: relative;
  right: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #01313c;
  width: 4rem;
  height: 4rem;
  border: 1px solid orange;
  border-right: 2px solid #01313c;
  border-radius: 4px 0 0 4px;
  i {
    font-size: 36px;
    color: orange;
  }
`;

const Controllers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #01313c;
  border: 1px solid orange;
  border-right: 0;
  padding: 1rem;
  width: 20rem;
  height: 20rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid orange;
  border-radius: 4px;
  outline: none;
  text-transform: uppercase;
  color: orange;
  background: #01313c;
`;

const FieldLabel = styled.span`
  display: inline-flex;
  align-items: center;
  color: white;
  padding-right: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  color: white;

  > label {
    padding-left: 0.5rem;
  }
`;

const Input = styled.input`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid orange;
  border-radius: 4px;
  outline: none;
  color: orange;
  background: #01313c;
`;

type ControlProps = {
  onImgSrcSet: (src: string) => void;
  onAddField: (id: string, fieldVariant: any) => void;
  onGenerateConfig: () => void;
};

export const Controls = ({
  onImgSrcSet,
  onAddField,
  onGenerateConfig,
}: ControlProps) => {
  const [id, setId] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState('number');

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && id !== '') {
      onAddField(id, selectedFieldType);
    }
  };

  return (
    <Panel>
      <Toggle onClick={() => setExpanded(!expanded)}>
        <i className="material-icons">
          {expanded ? 'chevron_right' : 'chevron_left'}
        </i>
      </Toggle>
      {expanded && (
        <Controllers>
          <InputWrapper>
            <FieldLabel>ID:</FieldLabel>
            <Input
              onChange={(e) => setId(e.currentTarget.value)}
              onKeyDown={onKeyDown}
              type="text"
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <input
              type="radio"
              id="numberInput"
              name="fieldType"
              value="number"
              checked={selectedFieldType === 'number'}
              onChange={() => setSelectedFieldType('number')}
            />
            <label htmlFor="numberInput">Number</label>
          </InputWrapper>
          <InputWrapper>
            <input
              type="radio"
              id="textInput"
              name="fieldType"
              value="text"
              checked={selectedFieldType === 'text'}
              onChange={() => setSelectedFieldType('text')}
            />
            <label htmlFor="textInput">Text</label>
          </InputWrapper>
          <InputWrapper>
            <input
              type="radio"
              id="checkboxInput"
              name="fieldType"
              value="checkbox"
              checked={selectedFieldType === 'checkbox'}
              onChange={() => setSelectedFieldType('checkbox')}
            />
            <label htmlFor="checkboxInput">Checkbox</label>
          </InputWrapper>
          <InputWrapper>
            <FieldLabel>Img src:</FieldLabel>
            <Input
              onChange={(e) => onImgSrcSet(e.currentTarget.value)}
              type="text"
            ></Input>
          </InputWrapper>
          <Button onClick={() => onGenerateConfig()}>Generate config</Button>
        </Controllers>
      )}
    </Panel>
  );
};
