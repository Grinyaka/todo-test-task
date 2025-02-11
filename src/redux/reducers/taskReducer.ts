import {TaskModel} from 'src/models/TaskModel'
import {AddTaskPayload, ChangeTaskPayload, DeleteTaskPayload, TaskActions} from '../actions/taskActions'

interface State {
  tasks: {[key: number]: TaskModel[]}
}
// можно было бы заранее получать данные из локалстореджа, но это только из-за отсутствия бд
const initialState: State = {
  tasks: {},
}

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TaskActions.ADD_TASK: {
      const payload: AddTaskPayload = action.payload
      const newTasks = [payload.task, ...(state.tasks[payload.projectId] || [])]
      return {
        ...state,
        tasks: newTasks,
      }
    }
    case TaskActions.DELETE_TASK: {
      const payload: DeleteTaskPayload = action.payload
      const newTasks = state.tasks[payload.projectId].filter((task) => task.id !== payload.taskId)
      return {
        ...state,
        tasks: newTasks,
      }
    }

    case TaskActions.CHANGE_TASK: {
      const payload: ChangeTaskPayload = action.payload
      const newTasks = state.tasks[payload.projectId].map((task) => {
        if (task.id === payload.task.id) {
          return payload.task
        }
        return task
      })
      return {
        ...state,
        tasks: newTasks,
      }
    }
    default:
      return state
  }
}
