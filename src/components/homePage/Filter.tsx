import { MenuItem, FormControl, InputLabel } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import _ from 'lodash'

export interface IFilter {
    countryList: string[]
    region: string | undefined
    setRegion: (region: string) => void
}

export const Filter = React.memo<IFilter>(
    ({ countryList, setRegion, region }) => {
        const handleChange = (event: SelectChangeEvent) => {
            setRegion(event.target.value)
        }

        return (
            <FormControl
                sx={{ minWidth: '12.5rem', bgcolor: 'primary.main' }}
                className="filterContainer"
            >
                <InputLabel id="select-geo" color={'info'}>
                    Filter by Region
                </InputLabel>
                <Select
                    labelId="select-geo-label"
                    id="select-geo"
                    value={region}
                    label="Filter by Region"
                    onChange={handleChange}
                    color={'info'}
                >
                    <MenuItem key="all" value="All">
                        All
                    </MenuItem>
                    {_(countryList)
                        .map(c => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))
                        .value()}
                </Select>
            </FormControl>
        )
    }
)

Filter.displayName = 'Filter'
