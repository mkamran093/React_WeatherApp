import React from "react";
import "./style.css";

const Home = () => {
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City Name" />
          <button>
            <img src="src/images/search.png" alt="" />
          </button>
        </div>
        <div className="winfo">
          {/* <img src="src/images/Cloudy.jpg" alt="" /> */}
          <h1>22C</h1>
          <h2>London</h2>
          <div className="details">
            <div className="col">
              <img src="src/images/humidity.png" alt="" />
              <div>
                <p>20%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src="src/images/wind.png" alt="" className="wind" />
              <div>
                <p>20 km/h</p>
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
