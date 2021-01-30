import React from 'react';
import styled from 'styled-components';
import { ImageCordFinder } from './ImageCordFinder';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Application = styled.div`
  display: flex;
  background: #00313c;
  min-height: 100vh;
`;

interface AppProps {}

const App = ({}: AppProps) => {
  return (
    <Application>
      <DndProvider backend={HTML5Backend}>
        <ImageCordFinder />
      </DndProvider>
    </Application>
  );
};

export default App;
