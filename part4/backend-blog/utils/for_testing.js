const reverse = (string)=>{
    return string.split('').reverse().join('')
}

const randomInt = (min, max)=>{
    return Math.floor(Math.random() * 10 + 1)
}

module.exports = {reverse}