import { CommentModel } from './CommentModel'
import {TaskModel, TaskPriority, TaskStatus} from './TaskModel'

export interface TaskPUTRequest {
  id: number
  title?: string
  status?: TaskStatus
  endDate?: Date
  priority?: TaskPriority
  file?: string
  subtask?: TaskModel // id of task to make it subtask
  comment?: CommentModel
  description?: string
}
