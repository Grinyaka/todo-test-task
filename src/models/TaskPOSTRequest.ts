import {TaskStatus} from './TaskModel'

export class TaskPOSTRequest {
  public readonly title: string
  public readonly status: TaskStatus
  public readonly projectId: number
  constructor(title: string, status: TaskStatus, projectId: number) {
    this.title = title
    this.status = status
    this.projectId = projectId
  }
}
