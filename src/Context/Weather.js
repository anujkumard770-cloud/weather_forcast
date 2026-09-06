import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  getWeatherDataForCity,
  getWeatherDataForLocation,
} from "../api";

const WeatherContext = createContext(null);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  const fetchData = useCallback(async () => {
    if (!searchCity) return;

    const response = await getWeatherDataForCity(searchCity);

    if (response.error) {
      alert("Location not found! Please check.");
      setData(null);
    } else {
      setData(response);
    }
  }, [searchCity]);

  const fetchCurrentUserLocationData = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeatherDataForLocation(
        position.coords.latitude,
        position.coords.longitude
      ).then((data) => setData(data));
    });
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        searchCity,
        data,
        setSearchCity,
        fetchData,
        fetchCurrentUserLocationData,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};