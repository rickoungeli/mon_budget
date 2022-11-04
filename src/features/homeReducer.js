import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState:{
        fonctionnality:'',
        deletedId: ''
    },
    reducers:{
        FONCTIONNALITY: (state, action) => {
            state.home = action.payload
        },
        DELETED_ID: (state, action) => {
            state.deletedId = action.payload
        },

    },
})

export const {FONCTIONNALITY, DELETED_ID} = homeSlice.actions;
export const selectFonctionnality = (state) => state.home.fonctionnality;
export const selectDeletedId = (state) => state.home.deletedId;

export default homeSlice.reducer;