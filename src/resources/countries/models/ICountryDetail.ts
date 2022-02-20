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
