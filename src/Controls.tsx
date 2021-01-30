import React, { useState } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: absolute;
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

const IdInput = styled.div`
  display: flex;
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
  onAddField: (id: string) => void;
};

export const Controls = ({ onAddField }: ControlProps) => {
  const [id, setId] = useState('');
  const [expanded, setExpanded] = useState(false);
  return (
    <Panel>
      <Toggle onClick={() => setExpanded(!expanded)}>
        <i className="material-icons">
          {expanded ? 'chevron_right' : 'chevron_left'}
        </i>
      </Toggle>
      {expanded && (
        <Controllers>
          <IdInput>
            <FieldLabel>ID:</FieldLabel>
            <Input
              onChange={(e) => setId(e.currentTarget.value)}
              type="text"
            ></Input>
          </IdInput>
          <Button onClick={() => onAddField(id)}>Add field</Button>
        </Controllers>
      )}
    </Panel>
  );
};
