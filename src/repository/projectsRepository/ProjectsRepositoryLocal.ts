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
    if (this.allProjects.length > 0) return this.allProjects;

    const storedData = localStorage.getItem(this.STORAGE_PROJECTS_NAME);
    if (!storedData) return [];

    const parsedData: JsonObject<ProjectModel[]> = JSON.parse(storedData);
    const projects = parsedData.map(ProjectModel.valueOfJson);
    this.allProjects = projects;
    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(projects));
    return projects;
  }

  public async addProject(projectTitle: string): Promise<ProjectModel> {
    const newProject = new ProjectModel(
      this.allProjects.length,
      projectTitle,
      0,
    );

    const updatedProjectsList = [newProject, ...this.allProjects];

    this.allProjects = updatedProjectsList;

    localStorage.setItem(
      this.STORAGE_PROJECTS_NAME,
      JSON.stringify(updatedProjectsList),
    );

    return newProject;
  }

  public async deleteProject(projectId: number): Promise<Response> {
    const filteredProjects = this.allProjects.filter(({ id }) => id !== projectId);

    this.allProjects = filteredProjects;

    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(filteredProjects));

    return new Response('OK', { status: 200 });
  }

  public async updateProject(request: Partial<IProjectModel>): Promise<Response> {
    const projectIndex = this.allProjects.findIndex(project => project.id === request.id);

    if (projectIndex === -1) {
      return new Response('Project not found', { status: 404 });
    }

    const updatedProjectData = {
      ...this.allProjects[projectIndex],
      ...request,
    };

    this.allProjects[projectIndex] = ProjectModel.valueOfJson(updatedProjectData);

    localStorage.setItem(this.STORAGE_PROJECTS_NAME, JSON.stringify(this.allProjects));

    return new Response('OK', { status: 200 });
  }
}
