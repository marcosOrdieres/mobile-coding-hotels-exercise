import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../Components/Header';
import HotelSection from '../../Components/HotelSection';
import {useFetch} from '../../hooks/useFetch';
import useTheme from '../../Theme/useTheme';
import useThemedStyles from '../../Theme/useThemedStyles';
import {Picker} from '@react-native-picker/picker';

export type HotelListType = {
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  contact: {
    phoneNumber: string;
    email: string;
  };
  currency: string;
  gallery: string[];
  id: number;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  name: string;
  price: number;
  stars: number;
  userRating: number;
};

export const StartScreen = () => {
  const [filterFeature, setFilterFeature] = useState<string>('price');
  const [number, setNumber] = useState<number>(1000);

  const {response, isLoading, error, setFetch, resetFetchData} = useFetch();
  const theme = useTheme();
  const style = useThemedStyles(styles);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const pickerRef = useRef();

  useEffect(() => {
    //setFetch(`${process.env.REACT_APP_LASTMINUTE_URL}`);
    setFetch('https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507');
  }, [setFetch]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[0]}
        style={backgroundStyle}>
        <Header backgroundColor={theme.colors.BACKGROUND}>
          <Text style={[style.sectionDescription]}>Hotels</Text>
        </Header>

        <View style={style.filterView}>
          <Button
            title="Filter"
            style={style.sectionDescription}
            onPress={() => pickerRef?.current.focus()}
          />

          <Picker
            ref={pickerRef}
            selectedValue={filterFeature}
            onValueChange={(itemValue: string) => setFilterFeature(itemValue)}>
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Stars" value="stars" />
            <Picker.Item label="User rating" value="userRating" />
          </Picker>

          <Text style={style.sectionDescription}>
            Ordered by: {filterFeature}
          </Text>

          <TextInput
            style={style.input}
            onChangeText={(numberToChange: string) =>
              numberToChange === ''
                ? setNumber(1000)
                : setNumber(parseInt(numberToChange))
            }
            value={number}
            placeholder="Max Price"
            keyboardType="numeric"
          />
        </View>

        <View style={style.resultsView}>
          <Text style={style.sectionDescription}>
            {response?.length} out of {response?.length} results
          </Text>
        </View>

        {response
          ?.sort(
            (a: HotelListType, b: HotelListType) =>
              b[filterFeature] - a[filterFeature],
          )
          .filter((hotel: HotelListType) => hotel.price < number)
          .map((hotel: HotelListType) => (
            <HotelSection
              key={hotel.id}
              uri={hotel.gallery[0]}
              userRating={hotel.userRating}
              name={hotel.name}
              stars={hotel.stars}
              city={hotel.location.city}
              address={hotel.location.address}
              price={hotel.price}
              currency={hotel.currency}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    sectionDescription: {
      fontFamily: 'OpenSans',
      fontSize: 18,
      fontWeight: '300',
      color: theme.colors.TEXT,
    },
    highlight: {
      fontWeight: '700',
    },
    filterView: {
      width: '100%',
      height: 50,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.colors.SECONDARY_DARK,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    resultsView: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.BACKGROUND,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
