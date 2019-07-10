import { combineReducers } from 'redux';
import indexPage from './modules/index'
import classificationsPage from './modules/classifications'
import goodsDetailPage from './modules/goods_detail'

export const rootReducer = combineReducers({
    indexPage,
    classificationsPage,
    goodsDetailPage
})

