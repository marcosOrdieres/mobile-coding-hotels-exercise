# mobile-coding-hotels-exercise

## Description
Hotel List in where you can filter by different features and see every Hotel in detail

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
cd product-list-case-study
npm i
npm start
```

## Development

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run test`

Run the test from the Project.

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

  return <View style={style.headerMainView}>{props.children}</View>;
};

const styles = (theme: any) =>
  StyleSheet.create({
    headerMainView: {
      flex: 1,
      marginTop: 30,
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

- Have the same UI for both platforms and some small issues setting up some Libraries as Vectors for ios.
- Writing all the logic and tests for the application to run smoothly.

## License

MIT

**Free Software, use and colab