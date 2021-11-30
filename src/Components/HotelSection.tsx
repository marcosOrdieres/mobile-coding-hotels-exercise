import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useThemedStyles from '../Theme/useThemedStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTheme from '../Theme/useTheme';

export interface HotelSectionProps {
  userRating: number;
  uri: string;
  name: string;
  stars: number;
  city: string;
  address: string;
  price: number;
  currency: string;
  onPressMoreDetails: any;
}

export const HotelSection: React.FC<HotelSectionProps> = props => {
  const [imageError, setImageError] = useState<boolean>(false);
  const style = useThemedStyles(styles);
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={props.onPressMoreDetails} style={style.mainView}>
      <View style={{flex: 0.7, flexDirection: 'row'}}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Image
            style={style.imageView}
            source={
              imageError
                ? require('../assets/Images/default_image.jpeg')
                : {uri: props.uri}
            }
            onError={() => setImageError(true)}
          />
        </View>
        <View style={style.hotelTextView}>
          <View style={style.ratingBox}>
            <Text style={style.ratingText}>{props.userRating}</Text>
          </View>
          <View style={{maxWidth: 150}}>
            <Text style={[style.hotelSectionText, {fontWeight: 'bold'}]}>
              {props.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            {[...Array(props.stars)].map((star: number, index: number) => (
              <React.Fragment key={index}>
                <Icon name="star" color={theme.colors.STAR} size={25} />
              </React.Fragment>
            ))}
          </View>

          <Text style={style.hotelSectionText}>City: {props.city}</Text>
          <Text style={style.hotelSectionText}>Address: {props.address}</Text>
        </View>
      </View>

      <View style={style.priceView}>
        <View style={{flex: 0.95, alignItems: 'flex-end'}}>
          <Text style={style.priceSubtext}>Total price for 1 night</Text>
          <Text style={style.priceText}>
            {props.price} {props.currency}
          </Text>
        </View>

        <View style={style.iconView}>
          <Icon
            name="chevron-right"
            color={theme.colors.LASTMINUTE}
            size={25}
          />
        </View>
      </View>
    </TouchableOpacity>
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
      backgroundColor: theme.colors.BACKGROUND,
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
      fontSize: 14,
      fontWeight: '300',
      color: 'black',
      marginBottom: 5,
    },
    ratingText: {
      fontSize: 22,
      fontWeight: '700',
      color: 'white',
    },
    priceText: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.TEXT,
    },
    priceSubtext: {
      fontSize: 12,
      fontWeight: '300',
      color: theme.colors.TEXT,
    },
    priceView: {
      flex: 0.3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    hotelTextView: {
      flex: 3,
      flexDirection: 'column',
      backgroundColor: theme.colors.SILVER, //TODO: check for light and dark
      padding: 10,
    },
    iconView: {
      flex: 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 5,
    },
  });

export default HotelSection;
