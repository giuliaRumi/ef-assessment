import { Box, OutlinedInput } from '@mui/material'
import * as React from 'react'

export interface ISearch {
    setCountry: (country: string) => void
}
export const Search = React.memo<ISearch>(({ setCountry }) => {
    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setCountry(event.target.value)
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            style={{ minWidth: '12.5rem' }}
            sx={{ bgcolor: 'primary.main', color: 'primary.dark' }}
        >
            <OutlinedInput
                placeholder="Search for a country..."
                onChange={handleChange}
                color={'info'}
            />
        </Box>
    )
})

Search.displayName = 'Search'
