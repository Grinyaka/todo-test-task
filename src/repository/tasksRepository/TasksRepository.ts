import {TaskPOSTRequest} from 'src/models/TaskPOSTRequest'
import { TaskModel, TaskStatus } from 'src/models/TaskModel';
import { TaskPUTRequest } from 'src/models/TaskPUTRequest';

export abstract class TasksRepository {
  public abstract getTasks(projectId: number, status: TaskStatus): Promise<TaskModel[]>

  //Могут быть промисы со статусом или с новой/измененной таской
  //с БД можно обойтись без projectId, т.к. все равно таски в единой таблице

  public abstract addTask(request: TaskPOSTRequest): Promise<TaskModel>

  public abstract updateTask(projectId: number, request: TaskPUTRequest): Promise<TaskModel>

  public abstract deleteTask(projectId: number, taskId: number): Promise<null | Response>

  public abstract deleteProject(projectId: number): Promise<null | Response>
}