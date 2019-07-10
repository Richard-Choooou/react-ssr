export default function (state = {
    classifications: []
}, action) {
    switch (action.type) {
        case 'SET_CLASSIFICATIONS_DATA':
            console.log('SET_CLASSIFICATIONS_DATA', action)
            state.classifications = action.value
            return JSON.parse(JSON.stringify(state))
        default:
            return state
    }
}