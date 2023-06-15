import React from 'react'
import './Input.css'

function Input(props) {
    return (
        <div className='InputContainer'>
            <div>
                <label >{props.inputName}</label>
                <input type='text' placeholder={props.placeholder} name={props.name} value={props.value} onChange={(event) => props.onChange(value => {
                    return {
                        ...value,
                        [props.name]: event.target.value
                    }
                })} />
            </div>
        </div>
    )
}

export default Input
