export type Message = {
  message: string,
  username: string,
  room: string,
  __createdtime__: number,
}

export type Bot_Message = {
  message: string,
  username: string,
  __createdtime__: number,
}

export type Login_user = {
  username: string,
  room: string
}

export type User = {
  id: string,
  username: string,
  room: string
}

export type Props = {
  username: string,
  room: string,
  socket: any
}