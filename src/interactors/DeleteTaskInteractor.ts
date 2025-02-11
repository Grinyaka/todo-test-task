import {ProjectsRepository} from 'src/repository/projectsRepository/ProjectsRepository'
import {TasksRepository} from 'src/repository/tasksRepository/TasksRepository'
import {Interactor} from './Interactor'
import {InteractorParams} from './InteractorParams'

export class Params extends InteractorParams {
  projectId: number
  taskId: number
  currentTaskAmount: number
}

export class DeleteTaskInteractor extends Interactor<Params, null> {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {
    super()
  }

  public async invoke(params: Params): Promise<null> {
    const { projectId, taskId, currentTaskAmount } = params;
    const response = await this.tasksRepository.deleteTask(projectId, taskId);

    if (response) {
      await this.projectsRepository.updateProject({
        id: projectId,
        tasksAmount: currentTaskAmount - 1,
      });
    }

    return null;
  }
}
