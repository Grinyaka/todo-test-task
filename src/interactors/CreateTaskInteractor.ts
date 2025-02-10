import {TaskModel} from 'src/models/TaskModel'
import {Interactor} from './Interactor'
import {InteractorParams} from './InteractorParams'
import {TasksRepository} from 'src/repository/tasksRepository/TasksRepository'
import {ProjectsRepository} from 'src/repository/projectsRepository/ProjectsRepository'
import {TaskPOSTRequest} from 'src/models/TaskPOSTRequest'

export class Params extends InteractorParams {
  projectId: number
  request: TaskPOSTRequest
  // не используется, если через бд
  currentTaskAmount: number
}

export class CreateTaskInteractor extends Interactor<Params, TaskModel> {
  public constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {
    super()
  }

  public async invoke(params: Params): Promise<TaskModel> {
    const postResponse = await this.tasksRepository.addTask(params.request)
    if (postResponse) {
      this.projectsRepository.updateProject({
        id: params.projectId,
        tasksAmount: params.currentTaskAmount + 1,
      })
    }

    return postResponse
  }
}
