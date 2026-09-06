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

    const query = searchCity.trim();
    const queryLower = query.toLowerCase();

    // 1. First check for India 
    const indiaResponse = await getWeatherDataForCity(
      `${query}, India`
    );

    if (!indiaResponse.error) {
      const apiCityName = indiaResponse.location.name.toLowerCase();
      // Check location ?= query
      if (apiCityName.includes(queryLower) || queryLower.includes(apiCityName)) {
        setData(indiaResponse);
        return;
      }
    }

    // 2. If location not found in India then go for  global search 
    const response = await getWeatherDataForCity(query);

    if (response.error) {
      alert("Location not found! Please check.");
      setData(null);
    } else {
      const apiCityName = response.location.name.toLowerCase();
      
      if (apiCityName.includes(queryLower) || queryLower.includes(apiCityName)) {
        setData(response);
      } else {
        alert("Location not found! Please check.");
        setData(null);
      }
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