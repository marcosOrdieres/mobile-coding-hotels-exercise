import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import useThemedStyles from '../Theme/useThemedStyles';
import {FlightType} from '../types/HotelListType';
import moment from 'moment';

export interface DetailedPackageProps {
  data: FlightType | null;
  onHidePress: () => void;
}

export const DetailedHotel: React.FC<DetailedPackageProps> = props => {
  const style = useThemedStyles(styles);

  return (
    <ScrollView style={style.centeredView}>
      <View style={style.modalView}>
        <Text style={style.modalTextMain}>Holiday Packages</Text>

        <Text style={style.modalTextDetailsTitle}>Airline: </Text>
        <Text style={style.modalTextDetailsSubtitle}>
          {props.data?.airline}
        </Text>

        <Text style={style.modalTextDetailsTitle}>Arrival airport:</Text>

        <Text style={style.modalTextDetailsSubtitle}>
          {props.data?.arrivalAirport}
        </Text>

        <Text style={style.modalTextDetailsTitle}>Arrival time:</Text>

        <Text style={style.modalTextDetailsSubtitle}>
          {moment(props.data?.arrivalTime).format('L')}
        </Text>

        <Text style={style.modalTextDetailsTitle}>Departure Airport:</Text>

        <Text style={style.modalTextDetailsSubtitle}>
          {props.data?.departureAirport}
        </Text>

        <Text style={style.modalTextDetailsTitle}>Departure Time:</Text>

        <Text style={style.modalTextDetailsSubtitle}>
          {moment(props.data?.departureTime).format('L')}
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
      marginTop: 30,
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
