import { WeatherDataType } from "../types/WeatherDataType";
import WeatherDay from "./WeatherDay";
import WeatherToday from "./WeatherToday";

export default ({ data }: { data: WeatherDataType[] }) => {
  const weatherReportDom = data.map((item, i) =>
    i === 0 ? (
      <WeatherToday key={i} data={item} />
    ) : (
      <WeatherDay key={i} data={item} />
    )
  );
  return <section className="weather-data">{weatherReportDom}</section>;
};
