import React, {useState} from "react";
import s from "../css/task.module.css";
import Input from "./Input";
import {Button} from "./Button";

type AddItemFormPropsType = {
   addItem: (title: string) => void
   className?: string
   placeholder?: string
}

export function AddItemForm(props: AddItemFormPropsType) {

   const [title, setTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   const onClickHandler = () => {
      if (title.trim() !== '') {
         props.addItem(title.trim())
         setTitle('')
      } else {
         setError('Title is required!')
      }
   }

   return (
      <div className={error ? s.taskForm + ' ' + s.taskFormError : s.taskForm}>
         <Input
            className={s.taskInput}
            title={title}
            addTask={props.addItem}
            setTitle={setTitle}
            placeholder={props.placeholder}
            type={'text'}
            setError={setError}
         />
         <Button
            className={s.taskButtonOdd}
            name={'+'}
            callback={onClickHandler}
         />
         {error && <div className={s.errorMassage}>{error}</div>}
      </div>
   )
}