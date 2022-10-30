import { CoordinateType } from "../types/CoordinateType";
import { OpenweathermapType } from "../types/OpenweathermapType";
import { WeatherDataType } from "../types/WeatherDataType";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useWeatherAPI = (coordinate: CoordinateType) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coordinate.lat}&lon=${coordinate.lon}&appid=99affdde710f1538117fe85eb29424f5`;

  return useQuery([`${coordinate.lat}${coordinate.lon}`], async () => {
    const { data } = (await axios.get(API_URL)) as unknown as {
      data: OpenweathermapType;
    };

    // For selecting the same hour for all the days
    const targetHour = data.list[0].dt_txt.toString().split(" ")[1];

    // Taking out clean data
    const weatherData: WeatherDataType[] = [];
    data.list.map((item) => {
      if (item.dt_txt.toString().split(" ")[1] === targetHour) {
        weatherData.push({
          temp: item.main.temp,
          iconID: item.weather[0].id,
          description: item.weather[0].main,
          day: new Date(item.dt_txt)
            .toLocaleTimeString("en-us", { weekday: "short" })
            .split(" ")[0],
          night: item.sys.pod === "n" ? true : false,
        });
      }
    });

    return weatherData;
  });
};
