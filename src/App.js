import { useEffect } from "react";

import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";

import { useWeather } from "./Context/Weather";

import "./App.css";

function App() {
  const weather = useWeather();

  console.log(weather);

  useEffect(() => {
    weather.fetchCurrentUserLocationData();
  }, [weather.fetchCurrentUserLocationData]);

  const handleSearch = () => {
    weather.fetchData();
  };

  const handleRefresh = () => {
    weather.fetchCurrentUserLocationData();

    if (weather.setSearchCity) {
      weather.setSearchCity("");
    }
  };

  return (
    <div className="App">
      <h1 className="weather-title">Weather Forecast</h1>

      <div className="search-container">
        <Input />
        <Button onClick={handleSearch} value="Search" />
      </div>

      <Card />

      <Button onClick={handleRefresh} value="Refresh" />
    </div>
  );
}

export default App;