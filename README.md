# mobile-coding-hotels-exercise

## Description
Hotel List in where you can filter by different features and see every Hotel in detail.

## Features

- See the list of Hotels
- Sort by price, stars and user rating
- Filter by max price
- See different details of every Hotel provided.

## Technologies

This application uses a number of open source projects to work properly:

- [React Native] - Create native apps for Android and iOS using React
- [Typescript] - JavaScript with syntax for types.
- [Testing Library] -Simple and complete testing utilities that encourage good testing practices.
- [Jest] - JavaScript Testing Framework with a focus on simplicity.

## Instalation

Install the dependencies and devDependencies and start the server.

```sh
cd mobile-coding-hotels-exercise
npm i
npm start
```


## Development

### `npm run ios`

Like ```npm start```, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

### `npm run android`

Like ```npm start```, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see React Native docs for detailed setup).

Ensure that JAVA_HOME and ANDROID_HOME are set.

### `npm run start`

Like ```react-native start```.

### `npm run test`

Run the test from the Project.

This project is set up to use jest for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called ```__tests__``` or with the .test extension to have the files loaded by jest.
## Components

This is an example of how I structured the Components, all of them have:

- An interface or a type.
- Themed styles, so styles can be re-used.
- Components.
- An exported const in order to use it anywhere else.

```js
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

```

## Plugins

This application uses some plugins in order to make the life a bit easier.

| Plugin          | Main Goal                                                  |
| --------------- | ---------------------------------------------------------- |
| react-native-vector-icons | Perfect for buttons, logos and nav/tab bars |
| react-test-renderer | For testing |
| @testing-library/react-hooks | In order to test Hooks |

## Challenges

- Have the same UI for both platforms and some small issues setting up some Libraries as Vectors for.
- Writing all the logic and tests for the application to run smoothly.

## DEMO

#### android:
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/15955125/144049927-f23192bb-7301-4706-8d32-1e8d355e70fe.gif)


#### ios:

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/15955125/144049940-56b6a59e-c14f-4ea3-8951-e811e91bca11.gif)

## License

MIT

**Free Software, use and colab
