import React, { useState } from 'react'
import "./Weather.css";
import { ToastContainer, toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import 'react-toastify/dist/ReactToastify.css';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';

const Weather = () => {

    const [weather, setweather] = useState([])
    const [city, setCity] = useState("")

    const HandleSubmit = async () => {
        if (city === "") {
            toast.warn("Please Enter city", {
                position: "top-center",
                autoClose: 1000,
                type: "warning",
            })
        }

        const key = "e8bf8a44d14a41d09dd65757240802";
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setweather([data])
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='weather_ui'>
                <div className='circle1'></div>
                <div className='circle2'></div>
                <div className='weather-container'>
                    <div className='input_container'>
                        <input type='text' value={city} placeholder='Enter location' className='input_style' onChange={(e) => setCity(e.target.value)} />
                        <span onClick={HandleSubmit}><SearchIcon /></span>
                    </div>
                    <div className='output_container'>
                        {
                            weather.map((data, i) => {
                                return (
                                    <div key={i} className='unique_div'>
                                        <div className='weather_image'>
                                            <img src={data.current.condition.icon} alt="weather-pic" />
                                        </div>
                                        <div className='weather_temp'>
                                            <h1>{data.current.temp_c} <sup>°C</sup></h1>
                                        </div>
                                        <div className='weather_location'>
                                            <h1>{data.location.country}</h1>
                                        </div>
                                        <div className='weather_report mt-15'>
                                            <div className='weather_box'>
                                                <div className='weather_icon'>
                                                    <img src={data.current.condition.icon} alt="weather-pic" />
                                                </div>
                                                <div className='weather_info'>
                                                    <h3>Weather</h3>
                                                    <p>{data.current.condition.text}</p>
                                                </div>
                                            </div>
                                            <div className='weather_box'>
                                                <div className='weather_icon'>
                                                    <WaterDropIcon />
                                                </div>
                                                <div className='weather_info'>
                                                    <h3>Humidity</h3>
                                                    <p>{data.current.humidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weather_report mt-15'>
                                            <div className='weather_box'>
                                                <div className='weather_icon'>
                                                    <AirIcon />
                                                </div>
                                                <div className='weather_info'>
                                                    <h3>Wind</h3>
                                                    <p>{data.current.wind_kph} km/h</p>
                                                </div>
                                            </div>
                                            <div className='weather_box'>
                                                <div className='weather_icon'>
                                                    <ThermostatIcon />
                                                </div>
                                                <div className='weather_info'>
                                                    <h3>Pressure</h3>
                                                    <p>{data.current.pressure_in}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather