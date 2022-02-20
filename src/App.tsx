import React from 'react'
import './App.css'
import { Header } from './Header'
import { HomePageContainer } from './homePage/HomePageContainer'
import { CountryDetail } from './drillIn/CountryDetail'
import { ThemeProvider, createTheme, Box } from '@mui/material'

function App() {
    const [countryDrillIn, setCountryDrillIn] = React.useState<string>()
    const [isDark, setIsDask] = React.useState<boolean>(false)

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#2C3742',
                dark: '#FFF',
                light: '#FFF',
            },
            secondary: {
                main: '#212C36',
            },
            info: {
                main: '#FFF',
            },
        },
    })

    const lightTheme = createTheme({
        palette: {
            primary: {
                main: '#FFF',
                dark: '#000',
                light: '#FFF',
            },
            secondary: {
                main: '#FAFAFA',
            },
            info: {
                main: '#000',
            },
        },
    })

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    bgcolor: 'secondary.main',
                }}
            >
                <Header setIsDask={setIsDask} isDark={isDark} />
                {countryDrillIn ? (
                    <CountryDetail
                        setCountryDrillIn={setCountryDrillIn}
                        countryDrillIn={countryDrillIn}
                    />
                ) : (
                    <HomePageContainer setCountryDrillIn={setCountryDrillIn} />
                )}
            </Box>
        </ThemeProvider>
    )
}

export default App
