import axios from "axios";
import { labsActions } from "./labsSlice";
import { toast } from "react-toastify";
import moment from "moment";


export const getAllLabs = () => (dispatch) => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/labs`, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if (res.data.success) {
            dispatch(labsActions.setLabs(res.data.labs))
        } else {
            return toast.warn(res.data.message)
        }
    }).catch((err) => {
        return toast.warn(err.message)
    })

}


export const createLab = (labDto) => (dispatch) => {

    axios.post(`${process.env.REACT_APP_API_URL}/api/labs`, {
        ...labDto,
        start_date: moment(labDto.start_date).format('YYYY-MM-DD'),
        end_date: moment(labDto.end_date).format('YYYY-MM-DD'),
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.data.success) {
            dispatch(labsActions.setIsCreatedSuccess(res.data.success))
            toast.success(res.data.message)
            setTimeout(() => {
                dispatch(labsActions.setIsCreatedSuccess(false))
            }, 1000);
            return
        } else {
            return toast.warn(res.data.message)
        }
    }).catch((err) => {
        if (err.response && err.response.data) {
            return err.response.data.message.map(el => toast.warn(el.msg))
        } else {
            return toast.warn(err.message)
        }
    })

}


export const getOneLab = (id) => (dispatch) => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/labs/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if (res.data.success) {
            dispatch(labsActions.setLab(res.data.lab))
            return
        } else {
            return toast.warn(res.data.message)
        }
    }).catch((err) => {
        return toast.warn(err.message)
    })

}

export const deleteLab = (id) => (dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/labs/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if (res.data.success) {
            toast.success(res.data.message)
            dispatch(labsActions.setLab({}))
            dispatch(labsActions.setIsDeletedSuccess(res.data.success))
            setTimeout(() => {
                dispatch(labsActions.setIsDeletedSuccess(false))
            }, 1000);
            return
        } else {
            return toast.warn(res.data.message)
        }
    }).catch((err) => {
        return toast.warn(err.message)
    })
}


export const updateLab = (id, labDto) => (dispatch) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/labs/${id}`, {
        ...labDto,
        start_date: moment(labDto.start_date).format('YYYY-MM-DD'),
        end_date: moment(labDto.end_date).format('YYYY-MM-DD'),
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if (res.data.success) {
            toast.success(res.data.message)
            dispatch(labsActions.setIsUpdatedSuccess(res.data.success))
            setTimeout(() => {
                dispatch(labsActions.setIsUpdatedSuccess(false))
            }, 1000);
            return
        } else {
            return toast.warn(res.data.message)
        }
    }).catch((err) => {
        if (err.response.data) {
            if (Array.isArray(err.response.data.message)) {
                return err.response.data.message.map(el => toast.warn(el.msg))
            } else {
                return toast.warn(err.response.data.message)
            }

        } else {
            return toast.warn(err.message)
        }
    })
}