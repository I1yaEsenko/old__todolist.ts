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
   checkedTaskStatus: (todolistId: string, pId: string, isDone: boolean) => void
   changeTaskTitle: (todolistId: string, pId: string, newTitle: string) => void
   removeTodolist: (todolistId: string) => void
   changeTodolistTitle:(todolistId: string, newTitle: string) => void
}

function Todolist(props: taskPropsType) {

   //удаление таски
   const removeTaskHandler = (pId: string) => {
      props.removeTask(props.todolistId, pId)
   }
   const newTaskList = props.tasks.map(p => {
      const checkedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
         props.checkedTaskStatus(props.todolistId, p.id, e.currentTarget.checked)
      }

         const onChangeTitleHandler = (newTitle:string) => {
            props.changeTaskTitle(props.todolistId, p.id, newTitle)
      }

      return (
         <li className={p.isDone ? s.taskTitle + ' ' + s.taskTitleDone : s.taskTitle}>
            <input type="checkbox" onChange={checkedTaskHandler} checked={p.isDone}/>
            <EditableSpan title={p.title} onChange={onChangeTitleHandler}/>
            <Button className={s.buttonDelete} name={'X'} callback={() => removeTaskHandler(p.id)}/>
         </li>
      )
   })
   // фильтрация по кнопкам
   const changeFilterButton = (value: filterValueType, todolistId: string) => {
      props.changeFilter(value, todolistId)
   }
   //удаление тудулиста
   const onClickHandlerDelete = () => {
      props.removeTodolist(props.todolistId)
   }

   const addTask = (title: string) => {
      props.addTask(props.todolistId, props.title)
   }

   const onChangeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.todolistId, newTitle)
   }

   return (
      <div className={s.taskBody}>
         <div className={s.tasksTitle}><EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
            <Button name={'X'}
                    callback={onClickHandlerDelete}
                    className={s.buttonDelete}/>
         </div>
         <div className={s.mainInput}>
            <AddItemForm addItem={addTask} placeholder={'Add new task'}/>
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


