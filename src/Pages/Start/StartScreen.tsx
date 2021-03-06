import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../Components/Header';
import HotelSection from '../../Components/HotelSection';
import {useFetch} from '../../hooks/useFetch';
import useTheme from '../../Theme/useTheme';
import useThemedStyles from '../../Theme/useThemedStyles';
import {HotelListType} from '../../types/HotelListType';
import DetailedHotel from '../../Components/DetailedHotel';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const StartScreen = () => {
  const [filterFeature, setFilterFeature] = useState<string>('price');
  const [maximumPrice, setMaximumPrice] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalFilterVisible, setModalFilterVisible] = useState<boolean>(false);
  const [hotelData, setHotelData] = useState<HotelListType | null>(null);

  const {response, isLoading, error, setFetch} = useFetch();
  const theme = useTheme();
  const style = useThemedStyles(styles);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    //setFetch(`${process.env.REACT_APP_LASTMINUTE_URL}`);
    setFetch('https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507');
  }, [setFetch]);

  const features = [
    {label: 'Price', value: 'price'},
    {label: 'Stars', value: 'stars'},
    {label: 'User rating', value: 'userRating'},
  ];

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.BACKGROUND}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[0]}
        style={{backgroundColor: theme.colors.BACKGROUND}}>
        <Header backgroundColor={theme.colors.BACKGROUND}>
          <Text style={style.mainTitle}>Hotels</Text>
        </Header>

        <View style={style.filterView}>
          <TouchableOpacity
            style={style.filterTouchable}
            color={theme.colors.SECONDARY_DARK}
            onPress={() => setModalFilterVisible(!modalFilterVisible)}>
            <Icon
              name="filter-alt"
              color={theme.colors.UNDERLINE_BLUE}
              size={25}
            />
            <Text
              style={[
                style.sectionDescription,
                {color: theme.colors.UNDERLINE_BLUE, paddingLeft: 5},
              ]}>
              Filter
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalFilterVisible}
            onRequestClose={() => setModalFilterVisible(!modalFilterVisible)}>
            <View style={style.modalView}>
              {features.map(eachFeature => (
                <TouchableOpacity
                  key={eachFeature.value}
                  style={{paddingTop: 10, paddingBottom: 10}}
                  onPress={() => {
                    setFilterFeature(eachFeature.value);
                    setModalFilterVisible(!modalFilterVisible);
                  }}>
                  <Text
                    style={[
                      style.sectionDescription,
                      {color: theme.colors.UNDERLINE_BLUE},
                    ]}>
                    {eachFeature.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>

          <Text style={[style.sectionDescription, {color: 'white'}]}>
            Ordered by: {filterFeature}
          </Text>

          <TextInput
            style={style.input}
            onChangeText={(numberToChange: string) =>
              numberToChange === ''
                ? setMaximumPrice(null)
                : setMaximumPrice(parseInt(numberToChange))
            }
            placeholderTextColor="#808080"
            value={maximumPrice?.toString()}
            placeholder="Max Price"
            keyboardType="numeric"
          />
        </View>

        {!error && !isLoading && (
          <View style={style.resultsView}>
            <Text style={style.sectionDescription}>
              {response?.length} out of {response?.length} results
            </Text>
          </View>
        )}

        {!isLoading &&
          !error &&
          response
            ?.sort((a: HotelListType, b: HotelListType) =>
              filterFeature === 'price'
                ? a[filterFeature] - b[filterFeature]
                : b[filterFeature] - a[filterFeature],
            )
            .filter((hotel: HotelListType) =>
              maximumPrice ? hotel.price < maximumPrice : hotel.price,
            )
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

        {isLoading && !error && <ActivityIndicator size="large" />}

        {error && (
          <View style={style.errorView}>
            <Text style={style.mainTitle}>Sorry, there has been an error</Text>
          </View>
        )}

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
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionDescription: {
      fontSize: 16,
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
      marginTop: 100,
    },
    errorView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    },
    filterTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
