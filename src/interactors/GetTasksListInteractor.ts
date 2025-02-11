import { TaskModel, TaskStatus } from 'src/models/TaskModel'
import { TasksRepository } from 'src/repository/tasksRepository/TasksRepository'
import { Interactor } from './Interactor'
import { InteractorParams } from './InteractorParams'

export class Params extends InteractorParams {
  projectId: number
  taskStatus: TaskStatus
}

export class GetTasksListInteractor extends Interactor<Params, TaskModel[]> {
  public constructor(private readonly tasksRepository: TasksRepository) {
    super()
  }

  public async invoke(params: Params): Promise<TaskModel[]> {
    return await this.tasksRepository.getTasks(params.projectId, params.taskStatus)
  }
}
