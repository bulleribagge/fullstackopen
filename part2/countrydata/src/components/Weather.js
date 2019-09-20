import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apikey from '../data/secret'

const Weather = ({ capital }) => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        console.log('useEffect')
        axios.get("http://api.apixu.com/v1/current.json?key=" + apikey + "&q=" + capital)
        .then(res => {
            console.log(res.data)
            setWeather(res.data)
        })
    }, [])

    return (
        <div>
            <h1> Weather in {capital}</h1>
            <strong>temperature: </strong>{weather.current && weather.current.temp_c} celcius<br />
            <strong>wind: </strong>{weather.current && weather.current.wind_kph} kph direction {weather.current && weather.current.wind_dir}
        </div>
    )
}
export default Weather
