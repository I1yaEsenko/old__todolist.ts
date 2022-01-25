import React, {ChangeEvent} from 'react';
import s from '../css/task.module.css'
import '../App.css'
import {filterValueType, TaskItemType} from "../App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type taskPropsType = {
   todolistId: string
   tasks: Array<TaskItemType>
   title: string
   removeTask: (todolistId: string, id: string) => void
   changeFilter: (value: filterValueType, todolistId: string) => void
   addTask: (todolistId: string, title: string) => void
   filter: filterValueType
   checkedTaskStatus: (todolistId: string, tasksId: string, isDone: boolean) => void
   changeTaskTitle: (todolistId: string, tasksId: string, newTitle: string) => void
   removeTodolist: (todolistId: string) => void
   changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

function Todolist(props: taskPropsType) {

   const removeTaskHandler = (tasksId: string) => {
      props.removeTask(props.todolistId, tasksId)
   }

   const checkedTaskHandler = (e: ChangeEvent<HTMLInputElement>, tasksId:string) => {
      props.checkedTaskStatus(props.todolistId, tasksId, e.currentTarget.checked)
   }

   const onChangeTitleHandler = (tasksId:string, title: string) => {
      props.changeTaskTitle(props.todolistId, tasksId, title)
   }


   const newTaskList = props.tasks.map(p => {
      return (
         <li className={p.isDone ? s.taskTitle + ' ' + s.taskTitleDone : s.taskTitle}>
            <input type="checkbox" onChange={(e) => checkedTaskHandler(e,p.id)} checked={p.isDone}/>
            <EditableSpan title={p.title} callback={(title)=> onChangeTitleHandler(p.id, title)}/>
            <Button className={s.buttonDelete} name={'X'} callback={() => removeTaskHandler(p.id)}/>
         </li>
      )
   })
   // фильтрация по кнопкам
   const changeFilterButton = (value: filterValueType, todolistId: string) => {
      props.changeFilter(value, todolistId)
   }
   //удаление тудулиста
   const onClickTodolistDeleteHandler = () => {
      props.removeTodolist(props.todolistId)
   }

   const addTask = (title: string) => {
      props.addTask(props.todolistId, title)
   }

   const onChangeTodolistTitle = (title: string) => {
      props.changeTodolistTitle(props.todolistId, title)
   }

   return (
      <div className={s.taskBody}>
         <div className={s.tasksTitle}>
            <EditableSpan title={props.title} callback={onChangeTodolistTitle}/>
            <Button name={'X'}
                    callback={onClickTodolistDeleteHandler}
                    className={s.buttonDelete}/>
         </div>
         <div className={s.mainInput}>
            <AddItemForm addItem={(title)=>addTask(title)} placeholder={'Add new task'}/>
         </div>
         <ul className={s.tasksList}>
            {newTaskList}
         </ul>
         <div className={s.buttonItems}>
            <Button
               className={props.filter === 'all' ? s.buttonConditionActive + ' ' + s.buttonCondition : s.buttonCondition}
               name={'all'}
               callback={() => changeFilterButton('all', props.todolistId)}/>
            <Button
               className={props.filter === 'completed' ? s.buttonConditionActive + ' ' + s.buttonCondition : s.buttonCondition}
               name={'completed'}
               callback={() => changeFilterButton('completed', props.todolistId)}/>
            <Button
               className={props.filter === 'active' ? s.buttonConditionActive + ' ' + s.buttonCondition : s.buttonCondition}
               name={'active'}
               callback={() => changeFilterButton('active', props.todolistId)}/>
         </div>
      </div>
   );
}

export default Todolist;


