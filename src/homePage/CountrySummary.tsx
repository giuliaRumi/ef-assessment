import { Box } from '@mui/material'
import * as React from 'react'

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
                src={flags.png}
                alt="React Logo"
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
