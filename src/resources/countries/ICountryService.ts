import { ICountrySummary } from './models/ICountrySummary'
import { ICountryDetail } from './models/ICountryDetail'

export interface ICountryService {
    getRegions(): string[]
    getCountriesSummary(geo?: string): Promise<ICountrySummary[]>
    getCountrySummaryByCode(code: string): Promise<ICountrySummary>
    getCountryDetailByCode(code: string): Promise<ICountryDetail>
}
