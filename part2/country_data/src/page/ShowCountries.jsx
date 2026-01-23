import ListCountries from "./ListCountries"
import CountryDetail from "../components/CountryDetail"

export default function ShowCountries({ data, type }) {
    if (!type || !data) {
        return null;
    }

    return (
        <>
            {type === "enough" && <p>{data}</p>}
            {type === "none" && <p>{data}</p>}
            {type === "array" && <ListCountries countries={data} />}
            {type === "unique" && <CountryDetail country={data} />}
        </>
    )
}