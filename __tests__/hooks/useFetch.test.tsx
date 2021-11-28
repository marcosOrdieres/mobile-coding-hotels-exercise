import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';
import {useFetch} from '../../src/hooks/useFetch';

const data = [
  {
    id: 1,
    currency: 'EUR',
    gallery: ['www.example.com'],
    contact: {
      email: 'example.com',
      phoneNumber: '+34 654 43 43 43',
    },
    checkIn: {
      from: 'string',
      to: 'string',
    },
    checkOut: {
      from: 'string',
      to: 'string',
    },
    location: {
      address: 'address',
      city: 'Madrid',
      latitude: 345,
      longitude: 345,
    },
    name: 'marcos',
    price: 345,
    stars: 345,
    userRating: 345,
  },
  {
    id: 2,
    currency: 'EUR',
    gallery: ['www.example2.com'],
    contact: {
      email: 'example2.com',
      phoneNumber: '+34 854 43 43 43',
    },
    checkIn: {
      from: '12',
      to: '12',
    },
    checkOut: {
      from: '2',
      to: '23',
    },
    location: {
      address: 'address',
      city: 'Berlin',
      latitude: 123,
      longitude: 123,
    },
    name: 'name',
    price: 123,
    stars: 123,
    userRating: 123,
  },
];

const error = 'An error occured!';

const url = 'example.com';

beforeAll(() => {
  global.fetch = fetch;
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('useFetch testing', () => {
  it('should return data from teh call after fetch', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      } as Response),
    );

    const {result} = renderHook(() => useFetch());

    await act(async () => {
      result.current.setFetch(url, {});
    });

    expect(result.current.response).toBe(data);
  });

  it('should catch error after call', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(error),
      } as Response),
    );

    const {result} = renderHook(() => useFetch());

    await act(async () => {
      result.current.setFetch(url, {});
    });

    expect(result.current.response).toBe(error);
  });
});
