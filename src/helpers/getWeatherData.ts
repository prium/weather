import { CoordinateType } from '../types/CoordinateType'
import { WeatherDataType } from '../types/WeatherDataType'
import { OpenweathermapType } from '../types/OpenweathermapType'

// Map for Caching API calls 
const weatherDataCacheMap: Map<string, WeatherDataType[]> = new Map();

export default async (location:CoordinateType) => {

    const locationKey = `${location.lat}${location.lon}`;

    if(!weatherDataCacheMap.has(locationKey)){

        const API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${location.lat}&lon=${location.lon}&appid=99affdde710f1538117fe85eb29424f5`;

        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error(`Failed to fetch from API! Status: ${response.status}`); 
        }
        const data = <OpenweathermapType> <unknown> await response.json();


        /* This is to select the specific hour for each day that matches with "Today" 
         * from the 3hour forecast API data
        */
        const targetHour = data.list[0].dt_txt.toString().split(" ")[1];

        const weatherData : WeatherDataType[] = [];

        data.list.map((item, i:number) => {
            if(item.dt_txt.toString().split(" ")[1]===targetHour){
                weatherData.push({
                temp: item.main.temp,
                iconID: item.weather[0].id,
                description: item.weather[0].main,
                day: new Date(item.dt_txt).toLocaleTimeString('en-us', {weekday: 'short'}).split(" ")[0],
                night: item.sys.pod === 'n' ? true : false,
                })
            }
        })

        weatherDataCacheMap.set(locationKey, weatherData);

    }//endif

    return <WeatherDataType[]>weatherDataCacheMap.get(locationKey);
}