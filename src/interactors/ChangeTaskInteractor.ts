import { TaskModel } from 'src/models/TaskModel'
import { TaskPUTRequest } from 'src/models/TaskPUTRequest'
import { TasksRepository } from 'src/repository/tasksRepository/TasksRepository'
import { Interactor } from './Interactor'
import { InteractorParams } from './InteractorParams'

export class Params extends InteractorParams {
  projectId: number
  request: TaskPUTRequest
}

export class ChangeTaskInteractor extends Interactor<Params, TaskModel> {
  public constructor(
    private readonly tasksRepository: TasksRepository,
  ) {
    super()
  }

  public async invoke(params: Params): Promise<TaskModel> {
    const postResponse = await this.tasksRepository.updateTask(
      params.projectId,
      params.request,
    )

    return postResponse
  }
}
