import { ProjectModel } from 'src/models/ProjectModel'

export enum ProjectActions {
  ADD_PROJECT = 'ADD_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  CHANGE_PROJECT = 'CHANGE_PROJECT'
}

export interface AddProjectPayload {
  project: ProjectModel
}

export interface DeleteProjectPayload {
  projectId: number
}

export interface ChangeProjectPayload {
  project: ProjectModel
}

export const addProject = (payload: AddProjectPayload) => ({
  type: ProjectActions.ADD_PROJECT,
  payload,
})

export const deleteProject = (payload: DeleteProjectPayload) => ({
  type: ProjectActions.DELETE_PROJECT,
  payload,
})

export const changeProject = (payload: ChangeProjectPayload) => ({
  type: ProjectActions.CHANGE_PROJECT,
  payload,
})
