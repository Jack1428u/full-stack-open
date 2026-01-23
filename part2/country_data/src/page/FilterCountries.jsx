export default function FilterCountries({ search, handleInput }) {
    return (
        <>
            <input
                value={search}
                onChange={handleInput}
                placeholder="Type a country name..."
            />
        </>
    )
}