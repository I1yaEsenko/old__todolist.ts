import React, {ChangeEvent, useState} from 'react';
import s from './css/main.module.css'
import Todolist from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import todolist from "./components/Todolist";

export type filterValueType = 'all' | 'completed' | 'active'

export type TaskItemType = {
   id: string
   title: string
   isDone: boolean
}

type TaskType = {
   id: string
   title: string
   filter: filterValueType
}

type TasksStateType = {
   [key: string]: Array<TaskItemType>
}

function App() {

   let todolistId1 = v1();
   let todolistId2 = v1();

   let [todolists, setTodolists] = useState<Array<TaskType>>([
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to buy', filter: 'all'},
   ])

   let [tasks, setTasks] = useState<TasksStateType>({
      [todolistId1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistId2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false},
      ]
   });

   const addTask = (todolistId: string, title: string) => {
      let newTask = {id: v1(), title, isDone: false}
      setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
      console.log(tasks)
   }

   const removeTask = (todolistId: string, id: string) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
   }

   const addTodolist = (title: string) => {
      let newTodolist: TaskType = {id: v1(), title, filter: 'all'}
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasks, [newTodolist.id]: []})
   }

   const removeTodolist = (todolistId: string) => {
      setTodolists(todolists.filter(f => f.id !== todolistId))
      delete tasks[todolistId]
   }

   const changeTodolistTitle = (todolistId:string, newTitle:string) =>{
      setTodolists(todolists.map(m=> m.id === todolistId ? {...m, title: newTitle}: m))
   }

   const checkedTaskStatus = (todolistId: string, pId: string, isDone: boolean) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === pId ? {...m, isDone} : m)})
   }

   const changeTaskTitle = (todolistId: string, pId: string, newTitle: string) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === pId ? {...m, title: newTitle} : m)})
   }

   const changeFilter = (value: filterValueType, todolistId: string) => {
      setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
   }


   return (
      <div className={s.mainBody}>
         <div className={s.mainWrapper}>
            <div className={s.mainInputBody}>
               <AddItemForm addItem={addTodolist} placeholder={'Add new Todolist'}/>
            </div>
            <div className={s.taskWrapper}>
               {
                  todolists.map((tl) => {
                     let filterValue = tasks[tl.id];
                     if (tl.filter === 'active') {
                        filterValue = filterValue.filter(p => !p.isDone)
                     }
                     if (tl.filter === 'completed') {
                        filterValue = filterValue.filter(p => p.isDone)
                     }

                     return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        tasks={filterValue}
                        title={tl.title}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        checkedTaskStatus={checkedTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                     />
                  })
               }
            </div>
         </div>
      </div>
   );
}

export default App;
