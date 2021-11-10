import {useEffect, useState} from 'react';
import axios from 'axios';
const useFetch = (url, email, password) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios
        .post(url, {
          email: email,
          password: password,
        })
        .then(function async(response) {
          console.log('Response is:', response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log('Error is:', error);
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [url]);

  return {loading, error, data};
};

export default useFetch;
