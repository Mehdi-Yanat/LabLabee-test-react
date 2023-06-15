import React, { useEffect, useState } from 'react'
import './Popup.css'
import Button from '../Elements/Button'
import Input from '../Elements/Input'
import { useDispatch, useSelector } from 'react-redux';
import { createLab, getOneLab, updateLab } from '../Store/labs/labsActions';
import { toast } from 'react-toastify';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

function Popup(props) {

    // @ts-ignore
    const lab = useSelector((state) => state.labs.lab)

    // @ts-ignore
    const labIdToupdate = useSelector(state => state.labs.labIdToUpdate)
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState({
        name: '',
        technology: '',
        start_date: moment(),
        end_date: moment()
    })

    console.log(formValues);


    useEffect(() => {
        if (labIdToupdate && Object.keys(lab).length) {
            setFormValues(value => {
                return {
                    name: lab.name,
                    technology: lab.technology,
                    start_date: moment(lab.start_date),
                    end_date: moment(lab.end_date)
                }
            })
        }
    }, [labIdToupdate, setFormValues, lab])

    useEffect(() => {
        if (labIdToupdate) {
            // @ts-ignore
            dispatch(getOneLab(labIdToupdate))
        }
    }, [labIdToupdate, dispatch])

    const closePopup = () => {
        props.setIsPopupOpen(false)
    }

    const submitData = (e) => {
        e.preventDefault()
        if (props.isCreate) {
            // @ts-ignore
            dispatch(createLab(formValues))
        } else {
            if (!labIdToupdate) return toast.warn('You must provide id')
            // @ts-ignore
            dispatch(updateLab(labIdToupdate, formValues))
        }
    }


    return (
        <div className='Popup-overlay'>
            <div className='Popup'>
                <div className='ClosePopup' >
                    <Button onClick={closePopup} styles={{ borderRadius: '30px', height: '30px', width: '30px' }} >
                        <div style={{ display: 'flex' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </div>
                    </Button>
                </div>
                <form onSubmit={submitData} className='Content'>
                    <h2 style={{ margin: '0' }} >{props.isCreate ? 'Create Lab' : 'Update Lab'}</h2>
                    <Input inputName={'Lab Name'} onChange={setFormValues} name={'name'} value={formValues.name} placeholder='Name' />
                    <Input inputName={'Lab Technology'} onChange={setFormValues} name={'technology'} value={formValues.technology} placeholder='Technology' />
                    <div className='Calendar'>
                        <label>
                            Start Date
                        </label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                <DemoItem >
                                    <DateCalendar
                                        value={formValues.start_date}
                                        onChange={d => {
                                            // @ts-ignore
                                            setFormValues(value => {
                                                return {
                                                    ...value,
                                                    start_date: d
                                                }
                                            })
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>

                    </div>
                    <div className='Calendar'>
                        <label>
                            End Date
                        </label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                <DemoItem >
                                    <DateCalendar
                                        value={formValues.end_date}
                                        onChange={d => {
                                            // @ts-ignore
                                            setFormValues(value => {
                                                return {
                                                    ...value,
                                                    end_date: d
                                                }
                                            })
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className='Submit'>
                        <Button >
                            Submit
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Popup
