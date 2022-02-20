import React from 'react'
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('EF Assessment tests', () => {
    test('Renders all elements', async () => {
        render(<App />)
        const headerTitle = screen.getByText(/Where in the world/i)
        expect(headerTitle).toBeInTheDocument()

        const headerSetting = screen.getByText(/Dark Mode/i)
        expect(headerSetting).toBeInTheDocument()

        const search = screen.getByPlaceholderText(/Search for a country/i)
        expect(search).toBeInTheDocument()

        const filter = screen.getByText(/All/i)
        expect(filter).toBeInTheDocument()

        const countries = await screen.findAllByText(/Population/i)
        expect(countries.length).toBeGreaterThan(1)
    })

    test('Filter search country', async () => {
        render(<App />)

        // When filtering on country name
        const search = screen.getByPlaceholderText(/Search for a country/i)
        userEvent.type(search, 'Swi')

        // Then filter is applied and countries are shown accordingly
        const countries = await screen.findAllByText(/Population/i)
        expect(countries.length).toBe(1)
    })

    test('Region filter dropdown test', async () => {
        render(<App />)

        // Given the dropdown
        const filter = screen.getByText('All')

        // Initially closed
        let europeFilter = screen.queryByText('Europe')
        expect(europeFilter).not.toBeInTheDocument()

        // When clicking on it
        userEvent.click(filter)

        // Then the options are shown
        europeFilter = await screen.findByText('Europe')
        expect(europeFilter).toBeInTheDocument()
    })

    test('Region filter selection test', async () => {
        render(<App />)

        // Given a country shown with the current region filter (i.e. all)
        const switzerland = await screen.findByText(/Switzerland/i)
        expect(switzerland).toBeInTheDocument()

        // When changing the region filter to not match the country above
        const filter = screen.getByText('All')
        userEvent.click(filter)

        const asiaFilter = await screen.findByText('Asia')
        userEvent.click(asiaFilter)

        // Then the country is not shown anymore
        await waitForElementToBeRemoved(screen.queryByText(/Switzerland/i))
        const switzerlandRemoved = screen.queryByText(/Switzerland/i)
        expect(switzerlandRemoved).not.toBeInTheDocument()
    })

    test('Country details', async () => {
        render(<App />)

        // Given a country flag in the home page
        const switzerlandFlag = await screen.findByAltText('CHE-flag')

        // When clicking on it
        userEvent.click(switzerlandFlag)

        // Then the details of the country are shown
        const languages = await screen.findByText('Languages:')
        expect(languages).toBeInTheDocument()
    })

    test('Country details - go back', async () => {
        render(<App />)

        // Given a country detail is shown
        const switzerlandFlag = await screen.findByAltText('CHE-flag')
        userEvent.click(switzerlandFlag)

        // When clicking back
        const backButton = await screen.findByText('Back')
        userEvent.click(backButton)

        // Then we go back to the main page
        const search = await screen.findByPlaceholderText(
            /Search for a country/i
        )
        expect(search).toBeInTheDocument()
    })

    test('Country details - border navigation', async () => {
        render(<App />)

        // Given a country detail is shown
        const switzerlandFlag = await screen.findByAltText('CHE-flag')
        userEvent.click(switzerlandFlag)

        // When clicking on a border
        const itaBorder = await screen.findByText('Italy')
        userEvent.click(itaBorder)

        // Then we go back to the Border country page
        const cheBorder = await screen.findByText('Switzerland')
        expect(cheBorder).toBeInTheDocument()
    })
})
