import {JsonObject} from 'src/types'
import {CommentModel} from './CommentModel'

export enum TaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum TaskStatus {
  queue = 'queue',
  development = 'development',
  done = 'done',
}

export class TaskModel {
  public static valueOfJson(json: JsonObject<TaskModel>) {
    return new TaskModel(
      json.id,
      json.title,
      new Date(json.createdDate),
      json.workTime,
      new Date(json.endDate),
      json.priority,
      json.files,
      json.status,
      json.subtasks,
      json.comments,
    )
  }

  // check if it better to create new class object or just change current object property value

  public readonly id: number
  public readonly title: string
  public readonly createdDate: Date
  public readonly workTime: string
  public readonly endDate: Date
  public readonly priority: TaskPriority
  public readonly files: string[]
  public readonly status: TaskStatus
  public readonly subtasks: TaskModel[]
  public readonly comments: CommentModel[]
  public readonly description?: string

  constructor(
    id: number,
    title: string,
    createdDate: Date,
    workTime: string,
    endDate: Date,
    priority: TaskPriority,
    files: string[],
    status: TaskStatus,
    subtasks: TaskModel[],
    comments: CommentModel[],
    description?: string,
  ) {
    this.id = id
    this.title = title
    this.createdDate = createdDate
    this.workTime = workTime
    this.endDate = endDate
    this.priority = priority
    this.files = files
    this.status = status
    this.subtasks = subtasks
    this.comments = comments
    this.description = description
  }
}
