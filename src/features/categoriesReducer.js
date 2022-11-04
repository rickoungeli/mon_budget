import {createSlice} from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState:{
        loadCategories: true,
        showCategoriesForm:false,
    },
    reducers:{
        loadCategories: (state, action) => {
            state.loadCategories = action.payload
        },
        showCategoriesForm: (state) => { //Affiche le formulaire de saisie des categories
            state.showCategoriesForm = !state.showCategoriesForm
        },

    },
})

export const {loadCategories} = categoriesSlice.actions;
export const {showCategoriesForm} = categoriesSlice.actions;

export const selectLoadCategories = (state) => state.categories.loadCategories;
export const selectShowCategoriesForm = (state) => state.categories.showCategoriesForm;

export default categoriesSlice.reducer;