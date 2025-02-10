export interface IProjectsRepository {
  getProjectsList: () => Promise<any>
  getProjectById: (id: number) => Promise<any>
}
