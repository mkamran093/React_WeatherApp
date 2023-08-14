import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "Karachi",
    weather: "Clear",
    humidity: 10,
    speed: 2,
    image: `url("src/images/bg.jpg")`,
  });

  const [city, setCity] = useState("Karachi");

  const [error, setError] = useState("");

  const imgStyle = {
    background: data.image,
    backgroundSize: "cover",
  };

  function handleClick() {
    if (city !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5ccc0314221e8f9e0b8cd4d04adffb5`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main == "Clear") {
            imagePath = "Clear.jpg";
          } else if (res.data.weather[0].main == "Snow") {
            imagePath = "Snow.jpg";
          } else if (res.data.weather[0].main == "Clouds") {
            imagePath = "Cloudy.jpg";
          } else if (res.data.weather[0].main == "Fog") {
            imagePath = "Fog.jpg";
          } else if (res.data.weather[0].main == "Haze") {
            imagePath = "Haze.jpg";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "Rain.jpg";
          } else if (res.data.weather[0].main == "Smoke") {
            imagePath = "Smoke.jpg";
          } else if (res.data.weather[0].main == "Sunny") {
            imagePath = "Sunny.jpg";
          } else if ("Thunder" in res.data.weather[0].main) {
            imagePath = "Clear.jpg";
          } else if ("wind" in res.data.weather[0].main) {
            imagePath = "Windy.jpg";
          }
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            weather: res.data.weather[0].main,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: `url(${imagePath})`,
          });
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
        <div className="winfo">
          <h1>{Math.round(data.celcius)} °C</h1>
          <h4>{data.weather}</h4>
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
