import { CoordinateType } from "../types/CoordinateType";
import { WeatherDataType } from "../types/WeatherDataType";
import { OpenweathermapType } from "../types/OpenweathermapType";

// Map for Caching API calls
const weatherDataCacheMap: Map<string, WeatherDataType[]> = new Map();

export default async (coordinate: CoordinateType) => {
  const coordinateKey = `${coordinate.lat}${coordinate.lon}`;

  if (!weatherDataCacheMap.has(coordinateKey)) {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coordinate.lat}&lon=${coordinate.lon}&appid=99affdde710f1538117fe85eb29424f5`;
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = <OpenweathermapType>(<unknown>await response.json());

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

    weatherDataCacheMap.set(coordinateKey, weatherData);
  } //endif

  return <WeatherDataType[]>weatherDataCacheMap.get(coordinateKey);
};
