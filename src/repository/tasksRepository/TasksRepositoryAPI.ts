import {BASE_API_URL} from 'src/utils/constants'
import {TasksRepository} from './TasksRepository'

export class TasksRepositoryAPI extends TasksRepository {
  private static readonly TASKS_API_URL = '{url}/todos'

  constructor(private readonly url: string) {
    super()
    this.url = BASE_API_URL
  }

  public async getTasks() {
    return []
  }

  public async addTask(task: any): Promise<any> {
    return
  }

  public async updateTask(task: any): Promise<any> {
    return
  }

  public async deleteTask(taskId: number): Promise<any> {
    return
  }
}
