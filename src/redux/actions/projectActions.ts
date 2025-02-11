import {ProjectModel} from 'src/models/ProjectModel'

export enum ProjectActions {
  ADD_PROJECT = 'ADD_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  CHANGE_PROJECT = 'CHANGE_PROJECT',
  SET_PROJECTS = 'SET_PROJECTS',
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
export interface SetProjectsPayload {
  projects: ProjectModel[]
}

export const setProjects = (payload: SetProjectsPayload) => ({
  type: ProjectActions.SET_PROJECTS,
  payload,
})
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
