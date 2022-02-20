export function getRegions(): string[] {
    // const response = await axios.get('/v2/all?fields=region')
    // const regions = response.data
    // if the API where better structured like support unique or return only the list then we should retrieve this dinamically

    return ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar']
}
