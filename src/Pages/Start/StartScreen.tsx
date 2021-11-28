import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../Components/Header';
import {useFetch} from '../../hooks/useFetch';
import useTheme from '../../Theme/useTheme';
import useThemedStyles from '../../Theme/useThemedStyles';

export const StartScreen = () => {
  const {response, isLoading, error, setFetch, resetFetchData} = useFetch();
  const theme = useTheme();
  const style = useThemedStyles(styles);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
          <Text style={style.sectionDescription}>Filter</Text>
          <Text style={style.sectionDescription}>Order by: Price</Text>
        </View>

        <View style={style.resultsView}>
          <Text style={style.sectionDescription}>6 out of 6 results</Text>
        </View>

        <View style={{backgroundColor: theme.colors.BACKGROUND}}>
          <Text style={style.sectionDescription}>Body</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = theme =>
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
  });
