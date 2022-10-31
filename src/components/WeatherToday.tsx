import { WeatherDataType } from "../types/WeatherDataType";

import "weather-react-icons/lib/css/weather-icons.css";
import { WeatherIcon } from "weather-react-icons";

export default ({
  data: { temp, iconID, night, description },
}: {
  data: WeatherDataType;
}) => {
  return (
    <div className="weather-day weather-day-today">
      <h4>Today</h4>
      <div className="weather-today-display">
        <WeatherIcon iconId={iconID} name="owm" night={night} />
        <div className="wather-today-reading">
          <p className="weather-temp weather-temp-today">{temp}&deg;</p>
          {description && <p className="h4">{description}</p>}
        </div>
      </div>
    </div>
  );
};
