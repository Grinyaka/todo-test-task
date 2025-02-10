import {JsonObject} from 'src/types'

export class ProjectModel {
  public static valueOfJson(json: JsonObject<ProjectModel>) {
    return new ProjectModel(json.id, json.title, json.tasksAmount)
  }

  public readonly id: number
  public readonly title: string
  public readonly tasksAmount: number

  constructor(id: number, title: string, tasksAmount: number) {
    this.id = id
    this.title = title
    this.tasksAmount = tasksAmount
  }
}
