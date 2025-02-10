import {JsonObject} from 'src/types'

export interface User {
  id: number
  name: string
}

export class CommentModel {
  public static valueOfJson(json: JsonObject<CommentModel>) {
    return new CommentModel(json.id, json.createdBy, json.text, new Date(json.createdDate), json.replyTo)
  }

  public readonly id: number
  public readonly createdBy: User
  public readonly text: string
  public readonly createdDate: Date

  public readonly replyTo?: number // id of comment replied to
  constructor(
    id: number,
    createdBy: User,
    text: string,
    createdDate: Date,

    replyTo?: number,
  ) {
    this.id = id
    this.createdBy = createdBy
    this.text = text
    this.createdDate = createdDate

    this.replyTo = replyTo
  }
}
