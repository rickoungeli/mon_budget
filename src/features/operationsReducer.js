import {createSlice} from '@reduxjs/toolkit';

export const operationsSlice = createSlice({
    name: 'operations',
    initialState:{
        fmonth:[
            {id:'01', libelle:'Janvier', lastday:'31'}, 
            {id:'02', libelle:'Février', lastday:'28'},
            {id:'03', libelle:'Mars', lastday:'31'},
            {id:'04', libelle:'Avril', lastday:'30'},
            {id:'05', libelle:'Mai', lastday:'31'},
            {id:'06', libelle:'Juin', lastday:'30'},
            {id:'07', libelle:'Juillet', lastday:'31'},
            {id:'08', libelle:'Août', lastday:'31'},
            {id:'09', libelle:'Septembre', lastday:'30'},
            {id:'10', libelle:'Octobre', lastday:'31'},
            {id:'11', libelle:'Novembre', lastday:'30'},
            {id:'12', libelle:'Décembre', lastday:'31'}],
        selectedOps:'D',
        dates: [
            {dateFrom: ''},
            {dateTo: ''}
        ],
        showSaisieForm:{
            value:false,
            ops:'',
            operation:''
        },
        loadOperations:true,
        operationsList: []
    },
    reducers:{
        DATES: (state, action) => { state.dates = action.payload },
        SELECTED_OPS: (state, action) => { state.selectedOps = action.payload },
        SHOW_SAISIE_FORM: (state, action) => { //Affiche le formulaire de saisie des dépenses effectuées
            state.showSaisieForm = action.payload
        },
        LOAD_OPERATIONS: (state, action) => {  
            state.loadOperations = !state.loadOperations
        },
        OPERATIONS_LIST: (state, action) => {  
            state.operationsList = action.payload
        },
        
    },
})

export const {DATES, SELECTED_OPS, SHOW_SAISIE_FORM, LOAD_OPERATIONS, OPERATIONS_LIST} = operationsSlice.actions;

export const selectSelectedOperation = (state) => state.operations.selectedOps ;
export const selectDateFrom = (state) => state.operations.dates.dateFrom ;
export const selectDateTo = (state) => state.operations.dates.dateTo ;
export const selectMonth = (state) => state.operations.fmonth;
export const selectShowSaisieForm = (state) => state.operations.showSaisieForm;
export const selectLoadOperation = (state) => state.operations.loadOperations;
export const selectOperationsList = (state) => state.operations.operationsList;

export default operationsSlice.reducer;