import React from 'react'

function Button(props) {
    return (
        <button onClick={props.onClick} style={props.styles}>
            {props.children}
        </button>
    )
}

export default Button
