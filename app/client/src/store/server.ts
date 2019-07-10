import { createStore } from 'redux'
import { rootReducer } from './index'

export function createServerStore() {
    return createStore(rootReducer)
}