import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await axios(url, options);
        setResponse(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(null);
        setError(error);
      }
    };
    fetchData();
  }, [options, url])

  return { response, loading, error };
}

export default useFetch;