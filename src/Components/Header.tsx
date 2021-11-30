import React from 'react';
import {View, StyleSheet} from 'react-native';
import useThemedStyles from '../Theme/useThemedStyles';

export interface HeaderProps {
  children: any;
  backgroundColor: string;
}

export const Header: React.FC<HeaderProps> = props => {
  const style = useThemedStyles(styles);

  return (
    <View
      style={[style.headerMainView, {backgroundColor: props.backgroundColor}]}>
      {props.children}
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    headerMainView: {
      width: '100%',
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Header;
