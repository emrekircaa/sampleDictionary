import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncData = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getAsyncData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        setData(JSON.parse(jsonValue).reverse());
      } else {
        setData([]);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getAsyncData };
};

export default useAsyncData;
