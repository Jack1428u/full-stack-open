const API_KEY = import.meta.env.VITE_API_KEY

import axios from 'axios'
const getWeather = (lat, lon) =>{
    console.log("API_key: ", API_KEY)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    return axios.get(url).then(res => res.data)
}
export default getWeather