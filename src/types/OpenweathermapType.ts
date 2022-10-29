import {CoordinateType} from './CoordinateType'

export type OpenweathermapType = {
    cod:     string;
    message: number;
    cnt:     number;
    list:    List[];
    city:    City;
}

export type City = {
    id:         number;
    name:       string;
    coord:      CoordinateType;
    country:    string;
    population: number;
    timezone:   number;
    sunrise:    number;
    sunset:     number;
}

export type List = {
    dt:         number;
    main:       MainClass;
    weather:    Weather[];
    clouds:     Clouds;
    wind:       Wind;
    visibility: number;
    pop:        number;
    sys:        Sys;
    dt_txt:     Date;
    rain?:      Rain;
}

export type Clouds = {
    all: number;
}

export type MainClass = {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    sea_level:  number;
    grnd_level: number;
    humidity:   number;
    temp_kf:    number;
}

export type Rain = {
    "3h": number;
}

export type Sys = {
    pod: Pod;
}

export enum Pod {
    D = "d",
    N = "n",
}

export type Weather = {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export type Wind = {
    speed: number;
    deg:   number;
    gust:  number;
}