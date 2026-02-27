const info = (...params) => {
    console.log('*'.repeat(50))
    console.log('/'.repeat(50))
    console.log(...params)
    console.log('/'.repeat(50))
    console.log('*'.repeat(50))
}

const error = (...params) => {
    console.log("\nERROR\n")
    console.log("!".repeat(50))
    console.log(...params)
    console.log("!".repeat(50))
}

module.exports = {
    info,
    error
}