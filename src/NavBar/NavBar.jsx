import React from 'react'
import './NavBar.css'
import Button from '../Elements/Button'

function NavBar(props) {

    const openPopup = () => {
        props.setIsPopupOpen(true)
        props.setIsCreate(true)
    }

    return (
        <div className='NavBar'>
            <h1> Labs </h1>
            <Button onClick={openPopup} >Create lab</Button>
        </div>
    )
}

export default NavBar
