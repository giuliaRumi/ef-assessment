import { Box } from '@mui/material'
import * as React from 'react'
import { ICountrySummary } from '../../resources/countries/models/ICountrySummary'

interface ICountrySummaryInternal extends ICountrySummary {
    setCountryDrillIn: (country: string) => void
}

export const CountrySummary: React.FC<ICountrySummaryInternal> = ({
    flags,
    name,
    population,
    region,
    capital,
    setCountryDrillIn,
    alpha3Code,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '300px',
                width: '250px',
                borderRadius: '8px',
                bgcolor: 'primary.main',
                color: 'primary.dark',
                marginBottom: '40px',
                marginRight: '40px',
            }}
        >
            <img
                className={"Clickable"}
                src={flags.png}
                alt={alpha3Code + '-flag'}
                style={{
                    width: '15.62rem',
                    height: '9.37rem',
                    borderTopRightRadius: '.5rem',
                    borderTopLeftRadius: '.5rem',
                }}
                onClick={() => setCountryDrillIn(alpha3Code)}
            />
            <div
                style={{
                    paddingLeft: '.62rem',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        fontWeight: 'bold',
                        paddingBottom: '.62rem',
                        paddingTop: '1rem',
                    }}
                >
                    {name}
                </div>
                <span>Population: {population} </span>
                <span>Region: {region}</span>
                <span>Capital: {capital}</span>
            </div>
        </Box>
    )
}

CountrySummary.displayName = 'CountrySummary'
