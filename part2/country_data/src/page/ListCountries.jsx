import { useState } from "react"
import CountryDetail from "../components/CountryDetail"

export default function ListCountries({ countries }) {
    const [selectedCountry, setSelectedCountry] = useState(null);

    if (selectedCountry) {
        return (
            <>
                <button onClick={() => setSelectedCountry(null)}>Back to list</button>
                <CountryDetail country={selectedCountry} />
            </>
        )
    }

    return (
        <>
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>
                        <p>{country.name.common}</p>
                        <button onClick={() => setSelectedCountry(country)}>show</button>
                    </li>
                ))}
            </ul>
        </>
    )
}