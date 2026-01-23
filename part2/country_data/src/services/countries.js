import axios from 'axios'

const api = axios.create({
    baseURL:'https://studies.cs.helsinki.fi/restcountries/api/all',
})

export const getCountries = ()=>api.get('').then(response=>response.data)