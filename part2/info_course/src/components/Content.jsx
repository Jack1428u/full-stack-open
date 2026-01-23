import { useState } from "react"
import Total from "./Total";
import Part from "./Part"

function Content({ parts }) {
    const total = parts.reduce((s, p) => s + p.exercises, 0);
    console.log("Total: ", total)
    return (
        <>
            {parts.map((part, index) => (
                <Part key={index} name={part.name} exercises={part.exercises} />
            ))}
            <Total total={total} />
        </>
    )
}

export default Content