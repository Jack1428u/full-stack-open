import { useEffect, useState } from "react"
import { getCountries } from "./services/countries"
import FilterCountries from "./page/FilterCountries";
import ShowCountries from "./page/ShowCountries";
function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [countriesShow, setCountriesShow] = useState({
        type: null,
        data: null,
    });

    useEffect(() => {
        const loadData = async () => {
            const data = await getCountries()
            setCountries(data);
            console.log(data);
        }
        loadData();
    }, [])

    useEffect(() => {
        if (!search || search.length === 0) {
            setCountriesShow({
                type: null,
                data: null,
            });
            return;
        }

        const filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().startsWith(search.toLowerCase())
        );

        console.log("Filtered countries:", filteredCountries);

        if (filteredCountries.length > 10) {
            setCountriesShow({
                type: "enough",
                data: "Too many matches, specify another filter",
            });
        } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
            setCountriesShow({
                type: "array",
                data: filteredCountries,
            });
        } else if (filteredCountries.length === 1) {
            setCountriesShow({
                type: "unique",
                data: filteredCountries[0],
            });
        } else {
            setCountriesShow({
                type: "none",
                data: "No matches found",
            });
        }
    }, [search, countries])

    const handleInput = (event) => {
        setSearch(event.target.value);
        console.log("Search value:", event.target.value);
    }

    return (
        <>
            <h1>Search Countries: </h1>
            <FilterCountries handleInput={handleInput} search={search} />
            <br />
            <ShowCountries data={countriesShow.data} type={countriesShow.type} />
        </>
    )
}

export default App