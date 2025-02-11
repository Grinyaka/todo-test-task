import { legacy_createStore } from 'redux';
import rootReducer from './reducers/rootReducer'

export const store = legacy_createStore(rootReducer)

export const manualStoreDispatcher = store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
