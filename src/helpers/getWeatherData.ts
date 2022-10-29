import { CoordinateType } from '../types/CoordinateType';
import { WeatherDataType } from '../types/WeatherDataType'

// import data from '../data-moscow.json'
const weatherDataCacheMap: Map<string, WeatherDataType[]> = new Map();

export default async (location:CoordinateType) => {

    console.log(weatherDataCacheMap)

    if(!weatherDataCacheMap.has(`${location.lat}${location.lon}`)){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${location.lat}&lon=${location.lon}&appid=99affdde710f1538117fe85eb29424f5`)
        const data = await response.json();
        // todo: handle API error

        //Preparing the date to match with the 3hour forecast API data
        const date = new Date();
        const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        const targetHour = data.list[0].dt_txt.split(" ")[1];

        const weatherData : WeatherDataType[] = [];

        data.list.map((item:any, i:any) => {
            if(item.dt_txt.split(" ")[1]===targetHour){
                weatherData.push({
                temp: item.main.temp,
                iconID: item.weather[0].id,
                description: item.weather[0].main,
                day: new Date(item.dt_txt).toLocaleTimeString('en-us', {weekday: 'long'}).split(" ")[0],
                night: item.sys.pod === 'n' ? true : false,
                })
            }
        })

        weatherDataCacheMap.set(`${location.lat}${location.lon}`, weatherData);

    }//endif

    return <WeatherDataType[]>weatherDataCacheMap.get(`${location.lat}${location.lon}`);
}