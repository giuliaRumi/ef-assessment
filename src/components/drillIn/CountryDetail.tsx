import * as React from 'react'
import { Box, Button } from '@mui/material'
import _ from 'lodash'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { ICountryDetail } from '../../resources/countries/models/ICountryDetail'
import { ICountrySummary } from '../../resources/countries/models/ICountrySummary'
import { countryServiceCached } from '../../resources/countries/CountryServiceCached'

interface ICountryDetailInternal extends ICountryDetail {
    borderDetails: ICountrySummary[]
}

interface ICountryDetailProps {
    setCountryDrillIn: (country: string | undefined) => void
    countryDrillIn: string
}
export const CountryDetail: React.FC<ICountryDetailProps> = ({
    countryDrillIn,
    setCountryDrillIn,
}) => {
    const [country, setCountry] = React.useState<ICountryDetailInternal>()

    React.useEffect(() => {
        ;(async () => {
            const countryFetched =
                await countryServiceCached.getCountryDetailByCode(
                    countryDrillIn
                )
            const borderCountriesSummary = await Promise.all(
                _.map(countryFetched.borders, b =>
                    countryServiceCached.getCountrySummaryByCode(b)
                ).values()
            )
            setCountry({
                ...countryFetched,
                borderDetails: borderCountriesSummary,
            })
        })()
    }, [countryDrillIn])

    return country === undefined ? null : (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '90%',
                color: 'primary.dark',
            }}
        >
            <Button
                style={{
                    width: '6.25rem',
                    marginLeft: '3.5rem',
                    marginTop: '5rem',
                    marginBottom: '5rem',
                }}
                variant="outlined"
                color="inherit"
                startIcon={<ArrowBackOutlinedIcon />}
                onClick={() => setCountryDrillIn(undefined)}
                className="countryDetailBackButton"
            >
                Back
            </Button>
            <div
                className="countryDetailContainer"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'inherit',
                }}
            >
                <img
                    className="countryDetailFlag"
                    src={country?.flags.png}
                    alt="React Logo"
                    style={{
                        width: '31.25rem',
                        height: '18.75rem',
                        paddingTop: '1.5rem',
                    }}
                />
                <div
                    style={{
                        paddingLeft: '0.62rem',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '31.25rem',
                    }}
                >
                    <h2
                        style={{
                            fontWeight: 'bold',
                            paddingBottom: '0.62rem',
                        }}
                    >
                        {country?.name}
                    </h2>
                    <div
                        className="countryDetailInfo"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '3.12rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: '1.87rem',
                            }}
                        >
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Native Name:{' '}
                                </span>
                                {country?.nativeName}
                            </p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Population:{' '}
                                </span>
                                {country?.population}
                            </p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Region:{' '}
                                </span>
                                {country?.region}
                            </p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Sub Region:{' '}
                                </span>
                                {country?.subregion}
                            </p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Capital:{' '}
                                </span>
                                {country?.capital}
                            </p>
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Top Level Domain:{' '}
                                </span>
                                {country?.topLevelDomain}
                            </p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Currencies:{' '}
                                </span>
                                {country?.currencies?.map(c => c.name + ' ')}
                            </p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    Languages:{' '}
                                </span>
                                {country?.languages?.map(l => l.name + ' ')}
                            </p>
                        </div>
                    </div>
                    {country?.borders?.length > 0 ? (
                        <div
                            className="countryDetailBorder"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontWeight: 'bold' }}>
                                Border Countries:
                            </span>
                            <div>
                                {_(country?.borderDetails)
                                    .map(border => (
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            key={border.alpha3Code}
                                            onClick={() =>
                                                setCountryDrillIn(
                                                    border.alpha3Code
                                                )
                                            }
                                            style={{
                                                marginLeft: '.4rem',
                                                marginBottom: '.4rem',
                                                marginRight: '.4rem',
                                            }}
                                        >
                                            {border.name}
                                        </Button>
                                    ))
                                    .value()}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </Box>
    )
}

CountryDetail.displayName = 'CountryDetail'
