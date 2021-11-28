import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import useThemedStyles from '../Theme/useThemedStyles';

export interface HotelSectionProps {
  userRating: number;
  uri: string;
  name: string;
  stars: number;
  city: string;
  address: string;
  price: number;
  currency: string;
}

export const HotelSection: React.FC<HotelSectionProps> = props => {
  const style = useThemedStyles(styles);

  return (
    <View style={style.mainView}>
      <View style={{flex: 0.7, flexDirection: 'row'}}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Image style={style.imageView} source={{uri: props.uri}} />
        </View>
        <View style={style.hotelTextView}>
          <View style={style.ratingBox}>
            <Text style={style.ratingText}>{props.userRating}</Text>
          </View>
          <Text style={style.hotelSectionText}>{props.name}</Text>
          <Text style={style.hotelSectionText}>{props.stars}</Text>
          <Text style={style.hotelSectionText}>{props.city}</Text>
          <Text style={style.hotelSectionText}>{props.address}</Text>
        </View>
      </View>
      <View style={style.priceView}>
        <Text style={style.priceSubtext}>Total price for 1 night</Text>
        <Text style={style.priceText}>
          {props.price} {props.currency}
        </Text>
      </View>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      margin: 2,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      height: 200,
      flexDirection: 'column',
      backgroundColor: theme.colors.BACKGROUND, //TODO: light: grey, si dark: dark secondary
      marginBottom: 20,
    },
    ratingBox: {
      position: 'absolute',
      backgroundColor: theme.colors.LASTMINUTE,
      right: 0,
      width: 60,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageView: {
      resizeMode: 'cover',
      width: '100%',
      height: '100%',
    },
    hotelSectionText: {
      fontFamily: 'OpenSans',
      fontSize: 16,
      fontWeight: '300',
      color: theme.colors.TEXT,
    },
    ratingText: {
      fontFamily: 'OpenSans',
      fontSize: 22,
      fontWeight: '700',
      color: 'white',
    },
    priceText: {
      fontFamily: 'OpenSans',
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.TEXT,
    },
    priceSubtext: {
      fontFamily: 'OpenSans',
      fontSize: 12,
      fontWeight: '300',
      color: theme.colors.TEXT,
    },
    priceView: {
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 20,
    },
    hotelTextView: {
      flex: 3,
      flexDirection: 'column',
      backgroundColor: theme.colors.SILVER, //TODO: check for light and dark
      padding: 10,
    },
  });

export default HotelSection;
