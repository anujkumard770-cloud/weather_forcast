import { useEffect } from "react";

import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";

import { useWeather } from "./Context/Weather";

import "./App.css";

function App() {
  const {
    fetchCurrentUserLocationData,
    fetchData,
    setSearchCity,
  } = useWeather();

  useEffect(() => {
    fetchCurrentUserLocationData();
  }, [fetchCurrentUserLocationData]);

  const handleSearch = () => {
    fetchData();
  };

  const handleRefresh = () => {
    fetchCurrentUserLocationData();
    setSearchCity("");
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