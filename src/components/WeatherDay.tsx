import 'weather-react-icons/lib/css/weather-icons.css'
import { WeatherIcon } from 'weather-react-icons'

import {WeatherDataType} from '../types/WeatherDataType'

export default ({temp, iconID, day, night} : WeatherDataType) => {
    return(
        <div className="weather-day">
          <h4>{day}</h4>
          <WeatherIcon iconId={iconID} name="owm" night={night} />
          <p className='weather-temp'>{temp}&deg;</p>
        </div>
    );
}