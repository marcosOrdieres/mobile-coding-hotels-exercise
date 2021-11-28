import {useEffect, useState} from 'react';

export const useFetch: any = () => {
  const [response, setResponse] = useState<any | null>(null);
  const [url, setUrl] = useState<string>('');
  const [options, setOptions] = useState<RequestInit>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetFetchData = () => {
    setResponse(null);
    setUrl('');
    setIsLoading(false);
    setError(null);
  };

  const setFetch = (url: string, options: RequestInit) => {
    setUrl(url);
    setOptions(options);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        if (json.errors) {
          throw new Error(json.errors[0].toString());
        }

        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    if (url !== '') {
      fetchData();
    }
  }, [url, options]);

  return {response, isLoading, error, setFetch, resetFetchData};
};
