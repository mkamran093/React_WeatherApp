import React from "react";
import axios from "axios";

const Time = (props) => {
  async function fetchTime(timezone) {
    try {
      const response = await axios.get(
        `http://worldtimeapi.org/api/${timezone}`
      );
      const timeData = response.datetime;

      console.log(response);
    } catch (error) {
      console.log("Error fetching time: " + error);
    }
  }
  fetchTime(props.timeZone);
  return <div></div>;
};

export default Time;
