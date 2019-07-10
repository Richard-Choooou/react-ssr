export default function (state = {
    recommendGoods: []
}, action) {
    switch (action.type) {
        case 'SET_RECOMMEND_GOODS':
            state.recommendGoods = action.value
            return JSON.parse(JSON.stringify(state))
        default:
            return state
    }
}