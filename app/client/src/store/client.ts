import { createStore } from 'redux'
import { rootReducer } from './index'

export default createStore(rootReducer, window.INIT_REDUX_STORE || {})
