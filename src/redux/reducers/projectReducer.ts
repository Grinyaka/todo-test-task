import {ProjectModel} from 'src/models/ProjectModel'
import {
  AddProjectPayload,
  ChangeProjectPayload,
  DeleteProjectPayload,
  ProjectActions,
  SetProjectsPayload,
} from '../actions/projectActions'

interface State {
  projects: ProjectModel[]
}

const initialState: State = {
  projects: [],
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectActions.ADD_PROJECT: {
      const payload: AddProjectPayload = action.payload
      return {
        ...state,
        projects: [payload.project, ...state.projects],
      }
    }
    case ProjectActions.DELETE_PROJECT: {
      const payload: DeleteProjectPayload = action.payload

      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== payload.projectId),
      }
    }
    case ProjectActions.CHANGE_PROJECT: {
      const payload: ChangeProjectPayload = action.payload

      return {
        ...state,
        projects: state.projects.map((project) => (project.id === payload.project.id ? payload.project : project)),
      }
    }
    case ProjectActions.SET_PROJECTS: {
      const payload: SetProjectsPayload = action.payload

      return {
        ...state,
        projects: payload.projects,
      }
    }
    default:
      return state
  }
}

export default projectReducer
