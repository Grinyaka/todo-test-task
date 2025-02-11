import {ProjectsRepository} from 'src/repository/projectsRepository/ProjectsRepository'
import {TasksRepository} from 'src/repository/tasksRepository/TasksRepository'
import {Interactor} from './Interactor'
import {InteractorParams} from './InteractorParams'

export class Params extends InteractorParams {
  projectId: number
}

export class DeleteProjectInteractor extends Interactor<Params, null> {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {
    super()
  }

  public async invoke({projectId}: Params): Promise<null> {
    const deleteProjectResponse = await this.projectsRepository.deleteProject(projectId)

    if (deleteProjectResponse) {
      await this.tasksRepository.deleteProject(projectId)
    }

    return deleteProjectResponse
  }
}
