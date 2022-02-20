import * as React from 'react'
import { CountrySummary } from './CountrySummary'
import { Search } from './Search'
import { Filter } from './Filter'
import _ from 'lodash'
import { ICountrySummary } from '../../resources/countries/models/ICountrySummary'
import { countryServiceCached } from '../../resources/countries/CountryServiceCached'

export interface IHomePageContainer {
    setCountryDrillIn: (country: string) => void
}
export const HomePageContainer = React.memo<IHomePageContainer>(
    ({ setCountryDrillIn }) => {
        const regions = countryServiceCached.getRegions()
        const [region, setRegion] = React.useState<string>('All')
        const [countries, setCountries] = React.useState<ICountrySummary[]>()
        const [selectedCountries, setSelectedCountries] =
            React.useState<ICountrySummary[]>()
        const [countrySearch, setCountrySearch] = React.useState<string>()

        React.useEffect(() => {
            ;(async () => {
                const countries =
                    await countryServiceCached.getCountriesSummary(
                        region === 'All' ? undefined : region
                    )
                setCountries(countries)
            })()
        }, [region])

        React.useEffect(() => {
            if (countrySearch) {
                const filtered = countries?.filter(c =>
                    c.name.toLowerCase().startsWith(countrySearch.toLowerCase())
                )
                setSelectedCountries(filtered)
            } else {
                setSelectedCountries(countries)
            }
        }, [countries, countrySearch])

        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        paddingTop: '2.5rem',
                        justifyContent: 'space-between',
                        paddingLeft: '3.5rem',
                        paddingRight: '3.5rem',
                    }}
                    className="searchFiler"
                >
                    <Search setCountry={setCountrySearch} />
                    <Filter
                        countryList={regions}
                        setRegion={setRegion}
                        region={region}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        paddingLeft: '3.5rem',
                        paddingRight: '1rem',
                        paddingTop: '1.87rem',
                    }}
                >
                    {_(selectedCountries)
                        .map(c => (
                            <CountrySummary
                                key={c.name}
                                capital={c.capital}
                                flags={c.flags}
                                name={c.name}
                                population={c.population}
                                region={c.region}
                                alpha3Code={c.alpha3Code}
                                setCountryDrillIn={setCountryDrillIn}
                            />
                        ))
                        .value()}
                </div>
            </>
        )
    }
)

HomePageContainer.displayName = 'HomePageContainer'
