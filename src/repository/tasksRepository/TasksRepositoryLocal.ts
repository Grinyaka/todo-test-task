import {TasksRepository} from './TasksRepository'
import {TaskModel, TaskPriority, TaskStatus} from 'src/models/TaskModel'
import {JsonObject} from 'src/types'
import {TaskPOSTRequest} from 'src/models/TaskPOSTRequest'
import {TaskPUTRequest} from 'src/models/TaskPUTRequest'

export class TasksRepositoryLocal extends TasksRepository {
  // так, конечно, плохо делать, но тут пока что можно
  private allTasks: {[key: number]: TaskModel[]}
  constructor() {
    super()
    this.allTasks = {}
  }

  private STORAGE_TASKS_NAME = 'TASKS'

  public async getTasks(projectId: number, status: TaskStatus): Promise<TaskModel[]> {
    const storedTasks = this.allTasks[projectId]
    if (storedTasks) {
      return storedTasks.filter((task) => task.status === status)
    }

    const storedData = localStorage.getItem(this.STORAGE_TASKS_NAME)
    if (!storedData) return []
    const parsedData: JsonObject<{[key:number]: TaskModel[]}> = JSON.parse(storedData)
    const tasksForProject = parsedData[projectId]
    if (!tasksForProject) return []

    const taskModels = tasksForProject.map(TaskModel.valueOfJson)
    this.allTasks[projectId] = taskModels

    return taskModels.filter((task) => task.status === status)
  }

  public async addTask(request: TaskPOSTRequest): Promise<TaskModel> {
    const projectId = request.projectId
    const title = request.title
    let tasksForProject = this.allTasks[projectId] || []
    const newTask = new TaskModel(
      tasksForProject.length,
      title,
      new Date(),
      '1h',
      new Date(),
      TaskPriority.low,
      [],
      request.status,
      [],
      [],
    )

    tasksForProject = [newTask, ...tasksForProject]
    this.allTasks[projectId] = tasksForProject
    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(this.allTasks))

    return newTask
  }

  public async updateTask(projectId: number, request: TaskPUTRequest): Promise<Response> {
    const projectTasks = this.allTasks[projectId] || []
    const taskIndex = projectTasks.findIndex((task) => task.id === request.id)

    if (taskIndex === -1) {
      return new Response('Task not found', {status: 404})
    }

    const task = projectTasks[taskIndex]
    const updatedTask = {
      ...task,
      title: request.title || task.title,
      endDate: request.endDate || task.endDate,
      priority: request.priority || task.priority,
      files: [...task.files, ...(request.file ? [request.file] : [])],
      status: request.status || task.status,
      subtasks: [...task.subtasks, ...(request.subtask ? [request.subtask] : [])],
      comments: [...task.comments, ...(request.comment ? [request.comment] : [])],
      description: request.description || task.description,
    }

    projectTasks[taskIndex] = updatedTask

    this.allTasks[projectId] = projectTasks

    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(this.allTasks))

    return new Response('OK', {status: 200})
  }

  public async deleteTask(projectId: number, taskId: number): Promise<null | Response> {
    const tasks = this.allTasks[projectId] || []

    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1)
    }

    this.allTasks[projectId] = tasks

    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(this.allTasks))

    return new Response('OK', {status: 200})
  }

  public async deleteProject(projectId: number): Promise<Response> {
    const tasks = this.allTasks
    delete this.allTasks[projectId]
    localStorage.setItem(this.STORAGE_TASKS_NAME, JSON.stringify(tasks))

    return new Response('OK', {status: 200})
  }
}
