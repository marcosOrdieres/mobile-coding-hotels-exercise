import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import useThemedStyles from '../Theme/useThemedStyles';
import {HotelListType} from '../types/HotelListType';

export interface DetailedHotelProps {
  data: HotelListType | null;
  onHidePress: any;
}

export const DetailedHotel: React.FC<DetailedHotelProps> = props => {
  const style = useThemedStyles(styles);

  return (
    <ScrollView style={style.centeredView}>
      <View style={style.modalView}>
        <Text style={style.modalTextMain}>{props.data?.name}</Text>
        <ScrollView horizontal={true}>
          {props.data?.gallery.map(hotelImage => (
            <View
              key={hotelImage}
              style={{width: 250, height: 250, margin: 10}}>
              <Image style={style.imageView} source={{uri: hotelImage}} />
            </View>
          ))}
        </ScrollView>
        <Text style={style.modalTextDetailsTitle}>Contact details</Text>
        <Text style={style.modalTextDetailsSubtitle}>
          {props.data?.contact.email}
        </Text>
        <Text style={style.modalTextDetailsSubtitle}>
          {props.data?.contact.phoneNumber}
        </Text>
        <Text style={style.modalTextDetailsTitle}>Location details</Text>

        <Text style={style.modalTextDetailsSubtitle}>
          {props.data?.location.address}, {props.data?.location.city}
        </Text>
        <Text style={style.modalTextDetailsSubtitle}>
          latitude: {props.data?.location.latitude}, longitude:
          {props.data?.location.longitude}
        </Text>

        <Pressable
          style={[style.button, style.buttonClose]}
          onPress={props.onHidePress}>
          <Text style={style.textStyle}>Go back to Hotels</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      marginTop: 5,
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.colors.BACKGROUND,
      borderRadius: 5,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      marginTop: 10,
      borderRadius: 5,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: theme.colors.LASTMINUTE,
    },
    textStyle: {
      color: 'white',
      fontWeight: '700',
      textAlign: 'center',
    },
    modalTextMain: {
      marginBottom: 10,
      textAlign: 'center',
      color: theme.colors.TEXT,
      fontSize: 20,
      fontWeight: '700',
    },
    modalTextDetailsTitle: {
      marginBottom: 10,
      textAlign: 'left',
      color: theme.colors.TEXT,
      fontSize: 18,
      fontWeight: '700',
    },
    modalTextDetailsSubtitle: {
      marginBottom: 10,
      textAlign: 'left',
      color: theme.colors.TEXT,
      fontSize: 12,
      fontWeight: '300',
    },
    imageView: {
      resizeMode: 'cover',
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
  });

export default DetailedHotel;
