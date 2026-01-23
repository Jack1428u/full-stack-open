import { useEffect, useState } from "react"
import getWeather from "../services/weather"
export default function CountryDetail({ country }) {
    const [clime, setClime] = useState(null);
    useEffect(() => {
        const [lat, lon] = country.latlng;
        console.log("LAT: ",lat,"LON: ", lon)
        const loadWeather = async () => {
            const data = await getWeather(lat, lon);
            setClime(data);
            return data;
        }
        loadWeather();
    }, [])

    return (
        <>
            <h1>Name: {country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <ul>
                {Object.values(country.languages).map((language, ind) => (
                    <li key={ind}><p>{language}</p></li>
                ))}
            </ul>
            <img src={country.flags.png ? country.flags.png : country.flags.svg} alt={country.flags.alt} style={{ 'width': 80 }} />
            {clime && (
                <div>
                    <h1>Weather {country.name.common}</h1>
                    <span>Status:<strong>{clime.weather[0].main}</strong></span>
                    <p>Temperature: {clime.main.temp} Fahrenheit </p>
                    <p>Wind Speed: {clime.wind.speed}</p>
                </div>

            )}
        </>
    )
}