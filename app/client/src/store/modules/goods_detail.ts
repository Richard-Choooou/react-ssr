export default function (state = {
    goodsData: {}
}, action: {
    type: string,
    value: object
}) {
    switch (action.type) {
        case 'SET_GOODS_DETAIL':
            state.goodsData = action.value
            return JSON.parse(JSON.stringify(state))
        case 'CLEAR_GOODS_DETAIL':
            state.goodsData = {}
            return JSON.parse(JSON.stringify(state))
        default:
            return state
    }
}