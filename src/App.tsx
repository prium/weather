import { useEffect, useState } from "react";

import { WeatherDataType } from "./types/WeatherDataType";
import { CoordinateType } from "./types/CoordinateType";
import { LoadingStatusType } from "./types/LoadingStatustype";

import Nav from "./components/Nav";
import WeatherToday from "./components/WeatherToday";
import WeatherDay from "./components/WeatherDay";

import getWeatherData from "./helpers/getWeatherData";

import "./scss/App.scss";

function App() {
  const [loadingStatus, setLoadingStatus] = useState(
    "LOADING" as LoadingStatusType
  );
  const [weatherData, setWeatherData] = useState([] as WeatherDataType[]);

  const [locations, setLocations] = useState([
    {
      name: "Ottawa",
      coordinate: {
        lat: 45.424721,
        lon: -75.695,
      },
      active: "active",
    },
    {
      name: "Moscow",
      coordinate: {
        lat: 55.751244,
        lon: 37.618423,
      },
      active: "",
    },
    {
      name: "Tokyo",
      coordinate: {
        lat: 35.652832,
        lon: 139.839478,
      },
      active: "",
    },
  ]);

  const populateStates = (coordinate: CoordinateType) => {
    setLoadingStatus("LOADING");

    // Getting weather data from API
    getWeatherData(coordinate)
      .then((data) => {
        setWeatherData(data);
        setLoadingStatus("LOADED");
      })
      .catch((error) => {
        console.log(error.message);
        setLoadingStatus("ERROR");
      });
  };

  const handleLocation = (index: number) => {
    // Updating the active menu style
    setLocations(
      locations.map((location, i) => ({
        ...location,
        active: index === i ? "active" : "",
      }))
    );

    populateStates(locations[index].coordinate);
  };

  useEffect(() => populateStates(locations[0].coordinate), []);

  const weatherReportDom = weatherData.map((item, i) =>
    i === 0 ? (
      <WeatherToday
        key={i}
        temp={item.temp}
        iconID={item.iconID}
        night={item.night}
        description={item.description}
      />
    ) : (
      <WeatherDay
        key={i}
        temp={item.temp}
        iconID={item.iconID}
        night={item.night}
        day={item.day}
      />
    )
  );

  return (
    <main className="weather-app">
      {
        {
          LOADING: <h4>Loading data...</h4>,
          ERROR: (
            <h4>
              Falied to load data.
              <br />
              Please refresh this page to try again.
            </h4>
          ),
          LOADED: (
            <>
              <Nav handleLocation={handleLocation} locations={locations} />
              <section className="weather-data">{weatherReportDom}</section>
            </>
          ),
        }[loadingStatus]
      }
    </main>
  );
}

export default App;
