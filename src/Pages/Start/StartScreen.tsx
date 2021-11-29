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
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../Components/Header';
import HotelSection from '../../Components/HotelSection';
import {useFetch} from '../../hooks/useFetch';
import useTheme from '../../Theme/useTheme';
import useThemedStyles from '../../Theme/useThemedStyles';
import {Picker} from '@react-native-picker/picker';
import {HotelListType} from '../../types/HotelListType';
import DetailedHotel from '../../Components/DetailedHotel';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const StartScreen = () => {
  const [filterFeature, setFilterFeature] = useState<string>('price');
  const [maximumPrice, setMaximumPrice] = useState<number>(1000);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hotelData, setHotelData] = useState<HotelListType | null>(null);

  const {response, isLoading, error, setFetch} = useFetch();
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
          <Text style={style.mainTitle}>Hotels</Text>
        </Header>

        <View style={style.filterView}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            color={theme.colors.SECONDARY_DARK}
            onPress={() => pickerRef?.current.focus()}>
            <Icon name="filter-alt" color="#58a6ff" size={25} />
            <Text
              style={[
                style.sectionDescription,
                {color: '#58a6ff', paddingLeft: 5},
              ]}>
              Filter
            </Text>
          </TouchableOpacity>

          <Picker
            ref={pickerRef}
            dropdownIconColor={theme.colors.SECONDARY_DARK}
            dropdownIconRippleColor={theme.colors.SECONDARY_DARK}
            selectedValue={filterFeature}
            onValueChange={(itemValue: string) => setFilterFeature(itemValue)}>
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Stars" value="stars" />
            <Picker.Item label="User rating" value="userRating" />
          </Picker>

          <Text style={[style.sectionDescription, {color: 'white'}]}>
            Ordered by: {filterFeature}
          </Text>

          <TextInput
            style={style.input}
            onChangeText={(numberToChange: string) =>
              numberToChange === ''
                ? setMaximumPrice(1000)
                : setMaximumPrice(parseInt(numberToChange))
            }
            placeholderTextColor="#808080"
            value={maximumPrice}
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
          ?.sort((a: HotelListType, b: HotelListType) =>
            filterFeature === 'price'
              ? a[filterFeature] - b[filterFeature]
              : b[filterFeature] - a[filterFeature],
          )
          .filter((hotel: HotelListType) => hotel.price < maximumPrice)
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
              onPressMoreDetails={() => {
                setModalVisible(true);
                setHotelData(hotel);
              }}
            />
          ))}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <DetailedHotel
            onHidePress={() => setModalVisible(!modalVisible)}
            data={hotelData}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    mainTitle: {
      fontSize: 26,
      fontWeight: '900',
      color: theme.colors.TEXT,
    },
    sectionDescription: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.TEXT,
    },
    highlight: {
      fontWeight: '700',
    },
    filterView: {
      width: '100%',
      height: 60,
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
      color: 'white',
    },
  });
