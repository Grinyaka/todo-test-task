import { TaskModel, TaskStatus } from 'src/models/TaskModel';

export enum TaskActions {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CHANGE_TASK = 'CHANGE_TASK',
  SET_TASKS = 'SET_TASKS',
}

export interface AddTaskPayload {
  task: TaskModel
  taskStatus: TaskStatus
}

export interface DeleteTaskPayload {
  task: TaskModel
  taskStatus: TaskStatus
}

export interface ChangeTaskPayload {
  task: TaskModel
  taskStatus: TaskStatus
}

export interface SetTasksPayload {
  tasks: TaskModel[]
  taskStatus: TaskStatus
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

export const setTaskList = (payload: SetTasksPayload) => ({
  type: TaskActions.SET_TASKS,
  payload,
})
