import React from "react";
import { useWeather } from "../Context/Weather";


const Input = (props) => {
    const weather = useWeather();

  return (
    <input
     className="input-field"
     placeholder="Search City..."
      value={weather.searchCity}
      onChange={(e) => weather.setSearchCity(e.target.value)}
    ></input>
  );
};


export default Input;