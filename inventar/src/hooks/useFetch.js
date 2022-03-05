import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (props) => {
  const  url  = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const controller = new AbortController();

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);
    console.log("AAA");
    console.log(props);
    axios
      .get(url, {
        signal: controller.signal,
      })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};
export default useFetch;
