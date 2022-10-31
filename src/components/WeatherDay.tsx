import { WeatherDataType } from "../types/WeatherDataType";

import "weather-react-icons/lib/css/weather-icons.css";
import { WeatherIcon } from "weather-react-icons";

export default ({
  data: { temp, iconID, day, night },
}: {
  data: WeatherDataType;
}) => {
  return (
    <div className="weather-day">
      <h4>{day}</h4>
      <WeatherIcon iconId={iconID} name="owm" night={night} />
      <p className="weather-temp">{temp}&deg;</p>
    </div>
  );
};
