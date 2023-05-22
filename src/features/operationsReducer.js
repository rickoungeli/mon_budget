const todaysdate = (new Date().toLocaleDateString()).split('/');  //Date du jour
let daysNumber
if (todaysdate[1]=='01') daysNumber = 31
if (todaysdate[1]=='02') daysNumber = 28
if (todaysdate[1]=='03') daysNumber = 31
if (todaysdate[1]=='04') daysNumber = 30
if (todaysdate[1]=='05') daysNumber = 31
if (todaysdate[1]=='06') daysNumber = 30
if (todaysdate[1]=='07') daysNumber = 31
if (todaysdate[1]=='08') daysNumber = 31
if (todaysdate[1]=='09') daysNumber = 30
if (todaysdate[1]=='10') daysNumber = 31
if (todaysdate[1]=='11') daysNumber = 30
if (todaysdate[1]=='12') daysNumber = 31

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
        selectedMonth: todaysdate[1],
        selectedYear: todaysdate[2],
        dates: {
            dateFrom: todaysdate[2]+'-'+todaysdate[1]+'-'+'01', 
            dateTo: todaysdate[2]+'-'+todaysdate[1]+'-'+daysNumber  
        },
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
        SELECTED_MONTH: (state, action) => { state.selectedMonth = action.payload },
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

export const {DATES, SELECTED_OPS, SELECTED_MONTH, SHOW_SAISIE_FORM, LOAD_OPERATIONS, OPERATIONS_LIST} = operationsSlice.actions;

export const selectSelectedOps = (state) => state.operations.selectedOps ;
export const selectSelectedMonth = (state) => state.operations.selectedMonth;
export const selectSelectedYear = (state) => state.operations.selectedYear;
export const selectDateFrom = (state) => state.operations.dates.dateFrom ;
export const selectDateTo = (state) => state.operations.dates.dateTo ;
export const selectMonth = (state) => state.operations.fmonth;
export const selectShowSaisieForm = (state) => state.operations.showSaisieForm;
export const selectLoadOperation = (state) => state.operations.loadOperations;
export const selectOperationsList = (state) => state.operations.operationsList;

export default operationsSlice.reducer;