import { ICountryService } from './ICountryService'
import { countryServiceRest } from './CountryServiceRest'
import { ICountryDetail } from './models/ICountryDetail'
import { ICountrySummary } from './models/ICountrySummary'
import _ from 'lodash'

class CountryServiceCached implements ICountryService {
    private countrySummaryMap: Map<string, ICountrySummary>
    private countryDetailMap: Map<string, ICountryDetail>

    constructor() {
        this.countrySummaryMap = new Map<string, ICountrySummary>()
        this.countryDetailMap = new Map<string, ICountryDetail>()
    }

    private async refreshCache(): Promise<void> {
        const countrySummaries = await countryServiceRest.getCountriesSummary()
        _(countrySummaries).forEach(c => {
            this.countrySummaryMap.set(c.alpha3Code, c)
        })
    }

    async getCountriesSummary(geo?: string): Promise<ICountrySummary[]> {
        if (this.countrySummaryMap.size === 0) {
            await this.refreshCache()
        }

        const filteredCountries: ICountrySummary[] = []

        this.countrySummaryMap.forEach(
            (value: ICountrySummary, key: string) => {
                if (geo === undefined || value.region === geo) {
                    filteredCountries.push(value)
                }
            }
        )

        return filteredCountries
    }

    async getCountrySummaryByCode(code: string): Promise<ICountrySummary> {
        if (this.countrySummaryMap.size === 0) {
            await this.refreshCache()
        }

        return this.countrySummaryMap.get(code)!
    }

    async getCountryDetailByCode(code: string): Promise<ICountryDetail> {
        if (this.countryDetailMap.has(code)) {
            return this.countryDetailMap.get(code)!
        }

        const countryDetail = await countryServiceRest.getCountryDetailByCode(
            code
        )
        this.countryDetailMap.set(code, countryDetail)

        return countryDetail
    }

    getRegions(): string[] {
        return countryServiceRest.getRegions()
    }
}

export const countryServiceCached = new CountryServiceCached()
