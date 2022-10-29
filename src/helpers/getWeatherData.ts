import { CoordinateType } from '../types/CoordinateType';
import { WeatherDataType } from '../types/WeatherDataType'

import data from '../data-moscow.json'

export default (location:CoordinateType) => {

    console.log(data.list[0].sys.pod)

    //Preparing the date to match with the 3hour forecast API data
    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

    // // https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=49.28&lon=123.12&appid=99affdde710f1538117fe85eb29424f5

    const weatherData : WeatherDataType[] = [];
    const targetHour = data.list[0].dt_txt.split(" ")[1];

    data.list.map((item, i) => {
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

    return weatherData
}