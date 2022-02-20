import axios from 'axios'
import { ICountrySummary } from './models/ICountrySummary'
import { ICountryDetail } from './models/ICountryDetail'

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

export async function getCountryByCode(code: string): Promise<ICountryDetail> {
    const response = await instance.get(`/v2/alpha/${code}`)
    return response.data
}
