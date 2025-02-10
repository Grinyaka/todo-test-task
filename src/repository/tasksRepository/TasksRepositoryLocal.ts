import {BASE_API_URL} from 'src/utils/constants'
import {TasksRepository} from './TasksRepository'
import {TaskModel, TaskPriority, TaskStatus} from 'src/models/TaskModel'
import {JsonObject} from 'src/types'
import {TaskPOSTRequest} from 'src/models/TaskPOSTRequest'
import {TaskPUTRequest} from 'src/models/TaskPUTRequest'

export class TasksRepositoryLocal extends TasksRepository {
  // так, конечно, плохо делать, но бэка нет, а отслеживать текущие
  private allTasks: Map<number, TaskModel[]>
  constructor() {
    super()
    this.allTasks = new Map()
  }

  private STORAGE_TASKS_NAME = 'TASKS'

  public async getTasks(projectId: number, status: TaskStatus): Promise<TaskModel[]> {
    if (this.allTasks.has(projectId)) {
      return this.allTasks.get(projectId) || []
    }

    const data = localStorage.getItem(this.STORAGE_TASKS_NAME)
    if (!data) return []

    const json: JsonObject<Map<number, TaskModel[]>> = JSON.parse(data)

    const tasksByProjectID = json.get(projectId)
    if (!tasksByProjectID) return []
    const result = tasksByProjectID.map(TaskModel.valueOfJson)

    this.allTasks.set(projectId, result)

    const filteredResult = result.filter((task) => task.status === status)
    return filteredResult
  }

  public async addTask(request: TaskPOSTRequest): Promise<TaskModel> {
    const projectTasks = this.allTasks.get(request.projectId) || []

    const newTask = new TaskModel(
      projectTasks.length,
      request.title,
      new Date(),
      '1h',
      new Date(),
      TaskPriority.low,
      [],
      TaskStatus.queue,
      [],
      [],
    )

    projectTasks.push(newTask)

    this.allTasks.set(request.projectId, projectTasks)

    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(this.allTasks))

    return newTask
  }

  public async updateTask(projectId: number, request: TaskPUTRequest): Promise<any> {
    const projectTasks = this.allTasks.get(projectId) || []

    const index = projectTasks.findIndex((task) => task.id === request.id)

    if (request.subtask) {
      projectTasks[index].subtasks.push(request.subtask)
    }

    if (request.file) {
      projectTasks[index].files.push(request.file)
    }

    if (request.comment) {
      projectTasks[index].comments.push(request.comment)
    }

    projectTasks[index] = TaskModel.valueOfJson({
      id: request.id,
      title: request.title || projectTasks[index].title,
      createdDate: projectTasks[index].createdDate,
      workTime: projectTasks[index].workTime,
      endDate: request.endDate || projectTasks[index].endDate,
      priority: request.priority || projectTasks[index].priority,
      files: projectTasks[index].files,
      status: request.status || projectTasks[index].status,
      subtasks: projectTasks[index].subtasks,
      comments: projectTasks[index].comments,
      description: request.description || projectTasks[index].description,
    })

    this.allTasks.set(projectId, projectTasks)

    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(this.allTasks))

    return new Response('OK', {status: 200})
  }

  public async deleteTask(projectId: number, taskId: number): Promise<any> {
    const projectTasks = this.allTasks.get(projectId) || []

    const index = projectTasks.findIndex((task) => task.id === taskId)
    projectTasks.splice(index, 1)

    this.allTasks.set(projectId, projectTasks)

    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(this.allTasks))
  }
}
