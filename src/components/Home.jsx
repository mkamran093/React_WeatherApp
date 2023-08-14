import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "Karachi",
    humidity: 10,
    speed: 2,
  });

  const [city, setCity] = useState("Karachi");

  function handleClick() {
    if (city !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=2fa73590fd8b5a4c6e68098ad5625395`;
      axios
        .get(apiUrl)
        .then((res) => {
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src="src/images/search.png" alt="" />
          </button>
        </div>
        <div className="winfo">
          {/* <img src="src/images/Cloudy.jpg" alt="" /> */}
          <h1>{Math.round(data.celcius)} °C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="src/images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src="src/images/wind.png" alt="" className="wind-logo" />
              <div className="wind">
                <p>{data.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
