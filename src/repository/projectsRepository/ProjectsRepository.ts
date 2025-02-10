import { IProjectModel, ProjectModel } from 'src/models/ProjectModel'

export abstract class ProjectsRepository {
  public abstract getProjectsList(): Promise<ProjectModel[]>

  public abstract addProject(projectTitle: string): Promise<ProjectModel>

  public abstract deleteProject(projectId: number): Promise<any>

  public abstract updateProject(request: Partial<IProjectModel>): Promise<any>
}
