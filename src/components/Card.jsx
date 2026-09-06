import React from "react";
import { useWeather } from "../Context/Weather";

const Card = () => {
  const weather = useWeather();

  if (!weather.data) {
    return (
      <div className="card">
        <p style={{ color: "#94a3b8", marginTop: "60px", fontSize: "16px" }}>
          City Not Found!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <img src={weather.data?.current?.condition?.icon} alt="weather-icon" />
      <h2>{weather.data?.current?.temp_c} C</h2>
      <h5>
        {weather.data?.location?.name}, {weather.data?.location?.region}{" "}
        {weather.data?.location?.country}
      </h5>
    </div>
  );
};

export default Card;