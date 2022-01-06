import React from 'react';

type buttonPropsType = {
    name: string
    callback: () => void
    className?: string
}

export const Button = (props: buttonPropsType) => {

    const onClickHandler = () => {
        props.callback()
    }

    return (
        <button onClick={onClickHandler} className={props.className}>
            {props.name}
        </button>
    )

};

