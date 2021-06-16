import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";

const DEFAULT_TIMEOUT = 500;
const useFetchLogged = (url) => {

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const userToken = authCtx.token;
      fetch(url, { 
        headers: {
        Authorization : "Bearer " + userToken
      } })
      .then(response => {
        if(!response.ok) {
          throw new Error("Could not fetch data from resource");
        }
        return response.json();
      }).then(data => { 
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.message);
      })
    }, DEFAULT_TIMEOUT);
  },[url, authCtx.token]);

  return { data, isLoading, error};
};

export default useFetchLogged;