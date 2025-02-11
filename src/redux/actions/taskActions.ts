import { TaskModel } from 'src/models/TaskModel';

export enum TaskActions {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CHANGE_TASK = 'CHANGE_TASK'
}

export interface AddTaskPayload {
  task: TaskModel,
  projectId: number
}

export interface DeleteTaskPayload {
  taskId: number,
  projectId: number
}

export interface ChangeTaskPayload {
  task: TaskModel,
  projectId: number
}

export const addTask = (payload: AddTaskPayload) => ({
  type: TaskActions.ADD_TASK,
  payload,
})

export const deleteTask = (payload: DeleteTaskPayload) => ({
  type: TaskActions.DELETE_TASK,
  payload,
})

export const changeTask = (payload: ChangeTaskPayload) => ({
  type: TaskActions.CHANGE_TASK,
  payload,
})
