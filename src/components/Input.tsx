import React, {ChangeEvent, KeyboardEvent,SetStateAction,Dispatch} from 'react';

type propsType = {
    title: string
    addTask: (title: string) => void
    setTitle: (title: string) => void
    className?: string
    placeholder?:string
    type:string
    setError: Dispatch<SetStateAction<string | null>>

}

const Input = ({title, addTask, setTitle, className, placeholder, type ,  ...props}: propsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null)
        if (event.key === 'Enter') {
            addTask(title)
            setTitle('')
        }
    }

    return (
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={className}
            placeholder={placeholder}
            type={type }/>
    );
};

export default Input;