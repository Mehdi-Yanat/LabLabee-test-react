import React, { useEffect, useState } from 'react';
import './Main.css';
import Button from '../Elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLab, getOneLab } from '../Store/labs/labsActions';
import { labsActions } from '../Store/labs/labsSlice';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { DateCalendar } from '@mui/x-date-pickers';

function Main(props) {
    const dispatch = useDispatch();
    // @ts-ignore
    const labs = useSelector((state) => state.labs.labsArray);
    // @ts-ignore
    const lab = useSelector((state) => state.labs.lab);
    // @ts-ignore
    const isUpdatedSuccess = useSelector((state) => state.labs.isUpdatedSuccess);
    // @ts-ignore
    const labIdToUpdate = useSelector((state) => state.labs.labIdToUpdate);

    const [value, setValue] = useState({
        start_date: moment(),
        end_date: moment()
    });

    // init state 
    useEffect(() => {
        if (Object.keys(lab).length) {
            // @ts-ignore
            setValue((value) => ({
                start_date: moment(lab.start_date),
                end_date: moment(lab.end_date)
            }));
        }
    }, [lab]);

    // open popup
    const openPopup = (id) => {
        props.setIsPopupOpen(true);
        props.setIsCreate(false);
        dispatch(labsActions.labIdToUpdate(id));
    };

    // dispatch get One Lab
    const getLab = (id) => {
        if (id) {
            // @ts-ignore
            dispatch(getOneLab(id));
        }
    };

    // 
    useEffect(() => {
        if (isUpdatedSuccess && labIdToUpdate) {
            // @ts-ignore
            dispatch(getOneLab(labIdToUpdate));
        }
    }, [isUpdatedSuccess, labIdToUpdate, dispatch]);

    const deleteLabHandler = (id) => {
        // @ts-ignore
        dispatch(deleteLab(id))
    }

    return (
        <div className='Main'>
            <div className='Labs'>
                {labs.length ? (
                    labs.map((el) => (
                        <div key={el._id}>
                            <h2>{el.name}</h2>
                            <div>
                                <Button onClick={() => getLab(el._id)}>Show</Button>
                                <Button onClick={() => openPopup(el._id)}>Update</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>No Lab was found!</h2>
                )}
            </div>
            <div className='LabsInfo'>
                {Object.keys(lab).length ? (
                    <>
                        <h2>{lab.name}</h2>
                        <h3>{lab.technology}</h3>
                        <div className='DateSection'>
                            <div className='startDate'>
                                <h3>Start Date</h3>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                        <DemoItem label='Read Only'>
                                            <DateCalendar
                                                value={value.start_date}
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className='endDate'>
                                <h3>End Date</h3>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                        <DemoItem label='Read Only'>
                                            <DateCalendar
                                                value={value.end_date}
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className='deleteButtonContainer'>
                            <Button onClick={() => deleteLabHandler(lab._id)}>
                                Delete
                            </Button>
                        </div>
                    </>
                ) : (
                    <h2>Select a lab you want to see</h2>
                )}
            </div>
        </div>
    );
}

export default Main;