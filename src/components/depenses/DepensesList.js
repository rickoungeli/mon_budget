import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { dateParser } from '../../utils/controllers';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { DIALOG_BOX } from '../../features/dialogReducer';
import { selectShowDialogBox } from '../../features/dialogReducer';
import { selectShowSaisieForm, selectLoadOperationList, selectSelectedOperation, selectDateFrom, selectDateTo } from "../../features/operationsReducer";
import { SHOW_SAISIE_FORM, LOAD_OPERATIONS_LIST } from '../../features/operationsReducer';
import Dialog from '../../components/commons/DialogBox';

const DepensesList = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('userId')
    const [totalMontant, setTotalMontant] = useState(0)
    
    const [errorMessage, setErrorMessage] = useState('') 
    const loadOperationsList = useSelector(selectLoadOperationList)
    const selectedOperation = useSelector(selectSelectedOperation)
    const showDialogBox = useSelector(selectShowDialogBox)
    let dateFrom = new Date(useSelector(selectDateFrom))
    let dateTo = new Date(useSelector(selectDateTo))

    
    
    return (
            
        <ul className='ul-scrolling bg-success bg-opacity-25  col-11 col-md-10 col-lg-8 mx-auto' >                
            {showDialogBox && <Dialog />}
            {errorMessage? <div className='alert alert-danger text-center mx-3 my-2 p-1'>{errorMessage}</div> : 
            
            operations
            .filter((operation) => operation.idtypeops.includes(selectedOperation))
            .filter((operation) => new Date(operation.dateops).getTime() >= dateFrom.getTime() && 
                                    new Date(operation.dateops).getTime() <= dateTo.getTime())
            .map((operation, index) => (
                <li key={index}  className='row border-bottom'>
                    <div className='col-3'>{dateParser(operation.dateops)}</div>
                    <div className='col-4 d-flex flex-column'>
                        <span className='text-success'>{operation.categorie}</span>
                        <span className=''>{operation.libelle}</span>
                    </div>
                    <div className='col-3 d-flex flex-column'>
                        <span className='text-success'></span>
                        <span className='text-right text-danger'>{operation.montant} €</span>
                    </div>
                    <button onClick={()=>dispatch(SHOW_SAISIE_FORM({value:true, ops:'editOperation', id:operation.id}))} className="btn col-1 py-0"><BsPencil /></button>
                    <button onClick={()=>dispatch(SHOW_SAISIE_FORM({value:true, ops:'deleteOperation', id:operation.id}))} className="btn col-1"><BsTrash /></button>
                </li>
            ))}   
        </ul>
    )
};

export default DepensesList;