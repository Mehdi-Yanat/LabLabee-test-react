import React from 'react'
import './NavBar.css'
import Button from '../Elements/Button'
import { useDispatch } from 'react-redux'
import { labsActions } from '../Store/labs/labsSlice'

function NavBar(props) {

    const dispatch = useDispatch()

    const openPopup = () => {
        props.setIsPopupOpen(true)
        props.setIsCreate(true)
        dispatch(labsActions.labIdToUpdate(''))
    }

    return (
        <div className='NavBar'>
            <h1> Labs </h1>
            <Button onClick={openPopup} >Create lab</Button>
        </div>
    )
}

export default NavBar
