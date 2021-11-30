import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HotelSection from '../../src/Components/HotelSection';

describe('HotelSection', () => {
  it('HotelSection should be shown', () => {
    const onClick = jest.fn();
    const {getByText} = render(
      <HotelSection
        key={1}
        uri={'www.example.com'}
        userRating={123}
        name={'name'}
        stars={2}
        city={'Berlin'}
        address={'Pistoriusstr. 102A'}
        price={123}
        currency={'EUR'}
        onPressMoreDetails={onClick}
      />,
    );
    //const hotelSection = screen.getByRole('hotelSection');
    const button = getByText('Berlin');

    fireEvent.press(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
