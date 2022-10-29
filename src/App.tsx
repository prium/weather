import { WeatherDataType } from './types/WeatherDataType'
import { CoordinateType } from './types/CoordinateType'

import Nav from './components/Nav'
import WeatherToday from './components/WeatherToday'
import WeatherDay from './components/WeatherDay'

import './scss/App.scss'
import { useEffect, useState } from 'react'
import getWeatherData from './helpers/getWeatherData'

function App() {

  const locationsData = [
    {
        name: "Ottawa",
        location: {
            lat: 45.424721,
            lon: -75.695000
        },
        active : 'active'
    },
    {
        name: "Moscow",
        location: {
            lat: 55.751244,
            lon: 37.618423
        },
        active: '',
    },
    {
        name: "Tokyo",
        location: {
            lat: 35.652832,
            lon: 139.839478
        },
        active: '',
    }

  ]

  const [locations, setLocations] = useState(locationsData)

  const toggleActive = (index:number) => {
      const updatedLocations = locations.map((location, i) => {
          if(i===index){
              return {
                  ...location,
                  active: 'active'
              }
          }
          return {
              ...location,
              active: ''
          }
      })

      setLocations(updatedLocations)
  }



  let weatherData : WeatherDataType[] = [] 
  
  useEffect(()=>{
    getWeatherData(locations[0].location).then(
      data => {
        setWeatherDataState(data)
      }
    )
  },[])

  const [weatherDataState, setWeatherDataState] = useState(weatherData)

  
  const weatherReportDom = weatherDataState.map(( item, i )=>{
    //Special representation tor Today's weather  
    if(i === 0) return <WeatherToday key={i} temp={item.temp} iconID={item.iconID} night={item.night} description={item.description}/>

    // All the upcoming days
    return <WeatherDay key={i} temp={item.temp} iconID={item.iconID} night={item.night} day={item.day} />

  })


  const handleLocation = (index:number) => {
    // console.log(locations[index].location)
    getWeatherData(locations[index].location).then(
      data => setWeatherDataState(data)
    )


    toggleActive(index)

  }


  return (
    <main className="weather-app">
      <Nav handleLocation={handleLocation} locationsData={locations}/>
      <section className="weather-data"> {weatherReportDom} </section>
    </main>
  );
}

export default App;
