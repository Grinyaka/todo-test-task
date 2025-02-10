import { IProjectModel, ProjectModel } from 'src/models/ProjectModel';
import { ProjectsRepository } from './ProjectsRepository';
import { JsonObject } from 'src/types';

export class ProjectsRepositoryLocal extends ProjectsRepository {
  private STORAGE_PROJECTS_NAME = 'PROJECTS'

  private allProjects: ProjectModel[]
  constructor() {
    super()
    this.allProjects = []
  }

  public async getProjectsList(): Promise<ProjectModel[]> {
    if (this.allProjects.length) return this.allProjects

    const data = localStorage.getItem(this.STORAGE_PROJECTS_NAME)
    if (!data) return []

    const json: JsonObject<ProjectModel[]> = JSON.parse(data)
    const response = json.map(ProjectModel.valueOfJson)
    this.allProjects = response
    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(response))
    return response
  }

  public async addProject(projectTitle: string): Promise<ProjectModel> {
    const newProject = new ProjectModel(this.allProjects.length, projectTitle, 0)
    const newProjectsList = [...this.allProjects, newProject]

    this.allProjects = newProjectsList

    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(newProjectsList))

    return newProject
  }

  public async deleteProject(projectId: number): Promise<any> {
    const newProjectsList = this.allProjects.filter((project) => project.id !== projectId)

    this.allProjects = newProjectsList

    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(newProjectsList))

    return new Response('OK', {status: 200})
  }

  public async updateProject(request: Partial<IProjectModel>): Promise<any> {
    const index = this.allProjects.findIndex((project) => project.id === request.id)

    this.allProjects[index] = ProjectModel.valueOfJson({
      ...this.allProjects[index],
      ...request,
    })

    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(this.allProjects))

    return new Response('OK', {status: 200})
  }
}
