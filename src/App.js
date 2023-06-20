// @ts-nocheck
import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './Main/Main';
import NavBar from './NavBar/NavBar';
import Popup from './Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLabs } from './Store/labs/labsActions';


function App() {

  const dispatch = useDispatch()

  const isCreatedSuccess = useSelector(state => state.labs.isCreatedSuccess)
  const isDeletedSuccess = useSelector(state => state.labs.isDeletedSuccess)
  const isUpdatedSuccess = useSelector((state) => state.labs.isUpdatedSuccess);

  const [isCreate, setIsCreate] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllLabs())
  }, [dispatch, isCreatedSuccess, isDeletedSuccess,isUpdatedSuccess])

  return (
    <div className="App">
      {isPopupOpen ? <Popup isCreate={isCreate} setIsPopupOpen={setIsPopupOpen} /> : ''}
      <NavBar setIsPopupOpen={setIsPopupOpen} setIsCreate={setIsCreate} />
      <Main setIsPopupOpen={setIsPopupOpen} setIsCreate={setIsCreate} />
    </div>
  );
}

export default App;
