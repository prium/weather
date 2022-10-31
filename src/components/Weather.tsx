import { CoordinateType } from "../types/CoordinateType";
import { WeatherDataType } from "../types/WeatherDataType";

import { locations } from "../data/locations";
import { useLocation } from "react-router-dom";
import { useWeatherAPI } from "../hooks/useWeatherAPI";

import Nav from "../components/Nav";
import WeatherReport from "../components/WeatherReport";

export default () => {
  const locationKey = useLocation().pathname.replace("/", "");
  const coordinate = locations.get(locationKey as string) as CoordinateType;

  const { status, data, error } = useWeatherAPI(coordinate) as {
    status: string;
    data: WeatherDataType[];
    error: Error;
  };

  return (
    <main className="weather-app">
      {status === "loading" ? (
        <h4>Loading data...</h4>
      ) : status === "error" ? (
        <h4>
          <span style={{ color: "red" }}>
            Error: {error?.message} <br />
          </span>
          <strong>Please refresh this page to try again.</strong>
        </h4>
      ) : (
        <>
          <Nav />
          <WeatherReport data={data} />
        </>
      )}
    </main>
  );
};
