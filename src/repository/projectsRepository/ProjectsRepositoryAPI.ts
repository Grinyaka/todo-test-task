import { IProjectModel, ProjectModel } from 'src/models/ProjectModel';
import { ProjectsRepository } from './ProjectsRepository';

export class ProjectRepositoryAPI extends ProjectsRepository {
  public async getProjectsList(): Promise<ProjectModel[]> {
    return []
  }

  public async addProject(projectTitle: string): Promise<any> {
    return {}
  }

  public async deleteProject(projectId: number): Promise<any> {
    return {}
  }

  public async updateProject(request: Partial<IProjectModel>): Promise<any> {
    return {}
  }
}