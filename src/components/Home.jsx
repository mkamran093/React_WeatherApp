import React, { useState, useEffect } from "react";
import axios from "axios";
import Time from "./Time";
import "./style.css";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "Karachi",
    country: "PK",
    weather: "Clear",
    humidity: 10,
    speed: 2,
    image: `url("src/images/bg.jpg")`,
    timezone: "",
  });

  const [city, setCity] = useState("Karachi");

  const [error, setError] = useState("");

  const imgStyle = {
    backgroundImage: data.image,
    backgroundSize: "cover",
  };

  function handleClick() {
    if (city !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=2fa73590fd8b5a4c6e68098ad5625395`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res);
          let imagePath = "";
          if (res.data.weather[0].main == "Clear") {
            imagePath = "src/images/Clear.jpg";
          } else if (res.data.weather[0].main == "Snow") {
            imagePath = "src/images/Snow.jpg";
          } else if (res.data.weather[0].main == "Clouds") {
            imagePath = "src/images/Cloudy.jpg";
          } else if (res.data.weather[0].main == "Fog") {
            imagePath = "src/images/Fog.jpg";
          } else if (res.data.weather[0].main == "Haze") {
            imagePath = "src/images/Haze.jpg";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "src/images/Rain.jpg";
          } else if (res.data.weather[0].main == "Smoke") {
            imagePath = "src/images/Smoke.jpg";
          } else if (res.data.weather[0].main == "Sunny") {
            imagePath = "src/images/Sunny.jpg";
          } else if ("Thunder" in res.data.weather[0].main) {
            imagePath = "src/images/Clear.jpg";
          } else if ("wind" in res.data.weather[0].main) {
            imagePath = "src/images/Windy.jpg";
          }
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            country: res.data.sys.country,
            weather: res.data.weather[0].main,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: `url(${imagePath})`,
            timezone: res.data.sys.timezone,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid city name");
          } else if (err.response.status === 429) {
            setError("Server Busy. Too many requests");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  }

  return (
    <div className="container">
      <div className="weather" style={imgStyle}>
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

        <div className="error">
          <p>{error}</p>
        </div>
        <Time timeZone={"Asia/Karachi"} />
        {/* <div className="time">
          <p>23:22:23</p>
        </div> */}
        <div className="winfo">
          <h1>{Math.round(data.celcius)} °C</h1>
          <h4>{data.weather}</h4>
          <h2>
            {data.name}, {data.country}
          </h2>
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
