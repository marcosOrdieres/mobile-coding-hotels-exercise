import React from 'react';
import {StartScreen} from './src/Pages/Start/StartScreen';
import ThemeProvider from './src/Theme/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <StartScreen />
    </ThemeProvider>
  );
};

export default App;
