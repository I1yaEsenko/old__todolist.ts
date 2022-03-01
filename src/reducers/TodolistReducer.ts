import {filterValueType, TaskType} from "../App";
import {v1} from "uuid";
import todolist from "../components/Todolist";


export const TodolistReducer = (state: Array<TaskType>, action: GeneralType) => {
   switch (action.type) {
      case 'ADD-TODOLIST': {
         let newTodolist: TaskType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
         return [newTodolist, ...state]
      }
      case "REMOVE-TODOLIST": {
         return state.filter(f => f.id !== action.payload.todolistId)
      }
      case "CHANGE-TITLE-TODOLIST": {
         return state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.title} : m)
      }
      case 'CHANGE-FILTER':{
         return state.map(m=>m.id===action.payload.todolistId ? {...m, filter:action.payload.value}: m)
      }
      default:
         return state
   }
}
type GeneralType = AddTodolistACType
   | RemoveTodolistACType
   | changeTitleTodolistACType
   | changeFilterACType

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const addTodolistAC = (title: string) => {
   return {
      type: 'ADD-TODOLIST',
      payload: {
         todolistId: v1(),
         title: title
      }
   } as const
}
export const removeTodolistAC = (todolistId: string) => {
   return {
      type: 'REMOVE-TODOLIST',
      payload: {
         todolistId: todolistId
      }
   } as const
}
export const changeTitleTodolistAC = (todolistId: string, title: string) => {
   return {
      type: 'CHANGE-TITLE-TODOLIST',
      payload: {
         todolistId: todolistId,
         title: title
      }
   } as const
}
export const changeFilterAC = (value: filterValueType, todolistId: string) => {
   return {
      type: 'CHANGE-FILTER',
      payload: {
         value: value,
         todolistId: todolistId
      }
   } as const
}

