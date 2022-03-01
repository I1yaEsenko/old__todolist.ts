import {addTodolistAC, TodolistReducer} from "./TodolistReducer";
import {TasksStateType, TaskType} from "../App";
import {TaskReducer} from "./TaskReducer";

test('ids should be equals', () => {
   const startTasksState: TasksStateType = {};
   const startTodolistsState: Array<TaskType> = [];

   const action = addTodolistAC("new todolist");

   const endTasksState = TaskReducer(startTasksState, action)
   const endTodolistsState = TodolistReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(action.payload.todolistId);
   expect(idFromTodolists).toBe(action.payload.todolistId);
});
