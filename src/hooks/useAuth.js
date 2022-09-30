import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../utils/apiendpoint";

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/isLoggedIn");
      return data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })();
  }, []);

  return { auth };
};
