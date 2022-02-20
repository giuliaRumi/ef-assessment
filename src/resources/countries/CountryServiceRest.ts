import { ICountryService } from './ICountryService'
import axios from 'axios'
import { countrySummaryKeys, ICountrySummary } from './models/ICountrySummary'
import { countryDetailKeys, ICountryDetail } from './models/ICountryDetail'

class CountryServiceRest implements ICountryService {
    private readonly FILTER_SEPARATOR = ','
    private readonly instance = axios.create({
        baseURL: 'https://restcountries.com',
        timeout: 30000,
    })

    async getCountriesSummary(geo?: string): Promise<ICountrySummary[]> {
        if (geo) {
            const response = await this.instance.get(
                `/v2/region/${geo}?filter=${countrySummaryKeys.join(
                    this.FILTER_SEPARATOR
                )}`
            )
            return response.data
        }

        const response = await this.instance.get(
            `/v2/all?filter=${countrySummaryKeys.join(this.FILTER_SEPARATOR)}`
        )
        return response.data
    }

    async getCountryDetailByCode(code: string): Promise<ICountryDetail> {
        const response = await this.instance.get(
            `/v2/alpha/${code}?filter=${countryDetailKeys.join(
                this.FILTER_SEPARATOR
            )}`
        )
        return response.data
    }

    getRegions(): string[] {
        return ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar']
    }

    async getCountrySummaryByCode(code: string): Promise<ICountrySummary> {
        const response = await this.instance.get(
            `/v2/alpha/${code}?filter=${countrySummaryKeys.join(
                this.FILTER_SEPARATOR
            )}`
        )
        return response.data
    }
}

export const countryServiceRest = new CountryServiceRest()
