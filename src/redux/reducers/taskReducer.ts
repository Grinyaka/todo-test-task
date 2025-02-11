import {TaskModel, TaskStatus} from 'src/models/TaskModel'
import {
  AddTaskPayload,
  ChangeTaskPayload,
  DeleteTaskPayload,
  SetTasksPayload,
  TaskActions,
} from '../actions/taskActions'

interface State {
  'queue': TaskModel[]
  'development': TaskModel[]
  'done': TaskModel[]
}
// можно было бы заранее получать данные из локалстореджа, но это только из-за отсутствия бд
const initialState: State = {
  'queue': [],
  'development': [],
  'done': [],
}

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TaskActions.ADD_TASK:
      return {
        ...state,
        [action.payload.taskStatus]: [action.payload.task, ...state[action.payload.taskStatus]],
      }

    case TaskActions.DELETE_TASK:
      return {
        ...state,
        [action.payload.taskStatus]: state[action.payload.taskStatus].filter(
          (task) => task.id !== action.payload.task.id,
        ),
      }

    case TaskActions.CHANGE_TASK:
      return {
        ...state,
        [action.payload.taskStatus]: state[action.payload.taskStatus].map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task,
        ),
      }

    case TaskActions.SET_TASKS:
      return {
        ...state,
        [action.payload.taskStatus]: action.payload.tasks,
      }

    default:
      return state
  }
}
