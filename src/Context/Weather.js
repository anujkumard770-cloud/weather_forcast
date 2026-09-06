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
    if (!searchCity.trim()) return;

    const city = searchCity.trim();

    // First, try to find the city in India
    const indiaResponse = await getWeatherDataForCity(
      `${city}, India`
    );

    if (!indiaResponse.error) {
      // If the city exists in India, always show the Indian location
      setData(indiaResponse);
      return;
    }

    // If the city doesn't exist in India,
    // search normally in other countries
    const response = await getWeatherDataForCity(city);

    if (response.error) {
      alert("Location not found! Please check.");
      setData(null);
    } else {
      setData(response);
    }
  }, [searchCity]);

  const fetchCurrentUserLocationData = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherDataForLocation(
          position.coords.latitude,
          position.coords.longitude
        ).then((data) => setData(data));
      },
      () => {
        alert("Unable to get your current location.");
      }
    );
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