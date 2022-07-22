
export interface TodoItem {
  _id: string,
  title: string,
  description: string,
  isCompleted: Boolean,
  userId: string,

  __v?: string | number
}