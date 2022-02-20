export interface ICountryDetail {
    flags: {
        svg: string
        png: string
    }
    name: string
    nativeName: string
    population: number
    region: string
    subregion: string
    capital: string
    currencies: {
        name: string
    }[]
    topLevelDomain: string[]
    languages: {
        name: string
    }[]
    borders: string[]
}

const dummyCountryDetails: Required<ICountryDetail> = {
    borders: [],
    capital: '',
    currencies: [],
    flags: { png: '', svg: '' },
    languages: [],
    name: '',
    nativeName: '',
    population: 0,
    region: '',
    subregion: '',
    topLevelDomain: [],
}

export const countryDetailKeys = Object.keys(dummyCountryDetails)
