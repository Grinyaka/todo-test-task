import {combineReducers} from 'redux'
import projectReducer from './projectReducer'
import { taskReducer } from './taskReducer'

const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer
})

export default rootReducer
