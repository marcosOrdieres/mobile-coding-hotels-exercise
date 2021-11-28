import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import HotelSection from '../../src/Components/HotelSection';

describe('HotelSection', () => {
  it('HotelSection should be shown', () => {
    const onClick = jest.fn();
    const {container} = render(
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
      />,
    );
    const hotelSection = screen.getByRole('hotelSection');

    fireEvent.click(hotelSection);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
