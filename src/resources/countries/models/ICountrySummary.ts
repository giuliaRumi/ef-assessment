export interface ICountrySummary {
    flags: {
        svg: string
        png: string
    }
    name: string
    population: number
    region: string
    capital: string
    alpha3Code: string
}

const dummyCountrySummary: Required<ICountrySummary> = {
    alpha3Code: '',
    capital: '',
    flags: { png: '', svg: '' },
    name: '',
    population: 0,
    region: '',
}

export const countrySummaryKeys = Object.keys(dummyCountrySummary)
