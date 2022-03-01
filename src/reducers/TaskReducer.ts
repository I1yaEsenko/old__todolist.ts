import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType} from "./TodolistReducer";


export const TaskReducer = (state: TasksStateType, action: GeneralType) => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
         }
      }
      case 'ADD-TASK': {
         let newTask = {id: v1(), title: action.payload.title, isDone: false}
         return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
      }
      case 'CHECKED-TASK-STATUS': {
         return {
            ...state, [action.payload.todolistId]: state[action.payload.todolistId]
               .map(m => m.id === action.payload.pId ? {...m, isDone:action.payload.isDone} : m)
         }
      }
      case 'CHANGE-TITLE-TASK':{
         return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
               .map(m => m.id === action.payload.taskId? {...m, title:action.payload.title}: m)}
      }
      case "ADD-TODOLIST":{
         return {...state, [action.payload.todolistId]:[]}
}
      default:
         return state
   }
}

type GeneralType = RemoveTaskACType | AddTaskACType | CheckedTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type CheckedTaskStatusACType = ReturnType<typeof checkedTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTitleTaskAC>

export const removeTaskAC = (todolistId: string, id: string) => {
   return {
      type: 'REMOVE-TASK',
      payload: {
         todolistId: todolistId,
         id: id
      }
   } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
   return {
      type: 'ADD-TASK',
      payload: {
         todolistId: todolistId,
         title: title
      }
   } as const
}

export const checkedTaskStatusAC = (todolistId: string, pId: string, isDone: boolean) => {
   return {
      type: 'CHECKED-TASK-STATUS',
      payload: {
         todolistId:todolistId,
         pId:pId,
         isDone:isDone
      }
   } as const
}

export const changeTitleTaskAC = (todolistId: string, taskId:string, title:string) => {
  return {
     type: 'CHANGE-TITLE-TASK',
     payload:{
        todolistId:todolistId,
        taskId: taskId,
        title:title
     }
  } as const
}

// export const addNewTodolistAC = (newTodolistId: string) => {
//    return {
//       type: 'ADD-NEW-TITLE-TODOLIST',
//       payload: {
//          todolistId: newTodolistId,
//                }
//    } as const
// }