import React from 'react';
import {useColorScheme} from 'react-native';
import {colors} from './colors';

export const ThemeContext = React.createContext({});

const ThemeProvider = ({children}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    colors: isDarkMode ? colors.dark : colors.light,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
