import React from 'react';
import {View} from 'react-native';

export interface HeaderProps {
  children: any;
  backgroundColor: string;
}

export const Header: React.FC<HeaderProps> = props => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        backgroundColor: props.backgroundColor,
        alignItems: 'center',
      }}>
      {props.children}
    </View>
  );
};

export default Header;
