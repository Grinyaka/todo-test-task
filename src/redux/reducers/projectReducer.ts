import {ProjectModel} from 'src/models/ProjectModel'
import {AddProjectPayload, ChangeProjectPayload, DeleteProjectPayload, ProjectActions} from '../actions/projectActions'

interface State {
  allProjects: ProjectModel[]
}

const initialState: State = {
  allProjects: [],
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectActions.ADD_PROJECT: {
      const payload: AddProjectPayload = action.payload
      return {
        ...state,
        allProjects: [payload.project, ...state.allProjects],
      }
    }
    case ProjectActions.DELETE_PROJECT: {
      const payload: DeleteProjectPayload = action.payload

      return {
        ...state,
        allProjects: state.allProjects.filter((project) => project.id !== payload.projectId),
      }
    }
    case ProjectActions.CHANGE_PROJECT: {
      const payload: ChangeProjectPayload = action.payload

      return {
        ...state,
        allProjects: state.allProjects.map((project) =>
          project.id === payload.project.id ? payload.project : project,
        ),
      }
    }
    default:
      return state
  }
}

export default projectReducer
