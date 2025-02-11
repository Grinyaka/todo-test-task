import {ProjectModel} from 'src/models/ProjectModel'
import {Interactor} from './Interactor'
import {InteractorParams} from './InteractorParams'
import {ProjectsRepository} from 'src/repository/projectsRepository/ProjectsRepository'

export class Params extends InteractorParams {}

export class GetProjectsListInteractor extends Interactor<Params, ProjectModel[]> {
  public constructor(private readonly projectsRepository: ProjectsRepository) {
    super()
  }

  public async invoke(params: Params): Promise<ProjectModel[]> {
    return await this.projectsRepository.getProjectsList()
  }
}
