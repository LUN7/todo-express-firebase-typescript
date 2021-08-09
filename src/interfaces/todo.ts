import * as user from "./user"

export interface IToDo {
  userId: user.IUser['id'],
  name: string,
  created: string,
  deadline: string,
}