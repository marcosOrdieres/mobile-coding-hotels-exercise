import React from 'react';
import {render} from '@testing-library/react-native';
import Header from '../../src/Components/Header';
import {Text} from 'react-native';

describe('Header', () => {
  it('Header should be in the document', () => {
    const backgroundColor = 'red';
    const {container} = render(
      <Header backgroundColor={backgroundColor}>
        <Text>Dummy Text</Text>
      </Header>,
    );
    expect(container).toBeDefined();
  });
});
