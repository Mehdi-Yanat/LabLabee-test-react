import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    labIdToUpdate: '',
    labsArray: [],
    lab: {},
    isCreatedSuccess: false,
    isUpdatedSuccess: false,
    isDeletedSuccess: false,
}

export const labsSlice = createSlice({
    name: 'labs',
    initialState,
    reducers: {
        setLabs: (state, action) => {
            state.labsArray = action.payload
        },
        setLab: (state, action) => {
            state.lab = action.payload
        },
        setIsCreatedSuccess: (state, action) => {
            state.isCreatedSuccess = action.payload
        },
        setIsUpdatedSuccess: (state, action) => {
            state.isUpdatedSuccess = action.payload
        },
        setIsDeletedSuccess: (state, action) => {
            state.isDeletedSuccess = action.payload
        },
        labIdToUpdate: (state, action) => {
            state.labIdToUpdate = action.payload
        }
    }
})

export const labsActions = labsSlice.actions;

export default labsSlice.reducer;