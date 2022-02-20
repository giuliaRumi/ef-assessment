import axios from 'axios'
import { ICountrySummary } from '../../homePage/CountrySummary'
import { ICountryDetail } from '../../drillIn/CountryDetail'

const instance = axios.create({
    baseURL: 'https://restcountries.com',
    timeout: 30000,
})

export async function getCountries(geo?: string): Promise<ICountrySummary[]> {
    if (geo) {
        const response = await instance.get(`/v2/region/${geo}`)
        return response.data
    }

    const response = await instance.get('/v2/all')
    return response.data
}

export async function getCountry(country: string): Promise<ICountryDetail> {
    const response = await instance.get(`/v2/name/${country}`)
    return response.data[0]
}

export async function getCountryByCode(code: string): Promise<ICountryDetail> {
    const response = await instance.get(`/v2/alpha/${code}`)
    return response.data
}
