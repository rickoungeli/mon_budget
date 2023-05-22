import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import axios from 'axios';
import { dateParser } from '../utils/controllers';
import { calculSomme } from '../utils/controllers';

import { selectOperationsList, selectShowSaisieForm, selectLoadOperation, selectSelectedOps, selectDateFrom, selectDateTo } from "../features/operationsReducer";
import { SHOW_SAISIE_FORM, OPERATIONS_LIST } from '../features/operationsReducer';
import { DELETED_ID, selectDeletedId, selectFonctionnality } from '../features/homeReducer';

import DatesAndOperationsForm from '../components/commons/DatesAndOperationsForm';    
import SaisieForm from '../components/commons/SaisieForm';


const Page = (props) => {
    const dispatch = useDispatch();
    let totalMontant = 0
    const user = localStorage.getItem('userId')
    const operationsList = useSelector(selectOperationsList)
    const [errorMessage, setErrorMessage] = useState('') 
    const showSaisieForm = useSelector(selectShowSaisieForm)
    const loadOperations = useSelector(selectLoadOperation)
    const selectedOperation = useSelector(selectSelectedOps)
    const dateFrom = new Date(useSelector(selectDateFrom))
    const dateTo = new Date(useSelector(selectDateTo))
    const deletedId = useSelector(selectDeletedId)
    
    const calculSomme = (montant) => {
        totalMontant += parseFloat(montant)
    
    }

    //Récupération de la liste des opérations
    useEffect(() => { 
        //if (loadOperationsList) {
            axios.get(`${process.env.REACT_APP_API_URL}depenses.php?function=getOperations&iduser=${user}`)
            .then (res => {
                if(!res.data) {
                    setErrorMessage('Aucune opération trouvée')
                } else {
                    dispatch(OPERATIONS_LIST(res.data))
                    //setOperationsList(res.data)
                }
            })
            .catch(err => {
                setErrorMessage("Une erreur s'est produite" + err);
            })
        //}
    }, [loadOperations /*, selectedOperation, dateFrom, dateTo */])


    const handleEdit = (operationId, operationType) => {
        operationsList.forEach((operation) => {
            if(operation.id == operationId){
                dispatch(SHOW_SAISIE_FORM({value:true, ops:operationType, operation:operation}))

            }

        })
    }
       
    return (

        <div className='page row no-gutters col-12'>
            <div className="page-titre d-flex justify-content-between px-2">
                <h4 className='ps-2 my-2'>{props.fonctionnalite == 'previsions'? 'Liste des prévisions' : 'Liste des dépenses'}</h4>
                <button className="btn btn-primary m-1 fs-1 pt-0" onClick={() => dispatch(SHOW_SAISIE_FORM({value:true, ops:'newOperation', id:''}))}>+</button>
            </div>
            
            <DatesAndOperationsForm />
            
            <ul className='ul-scrolling col-11 col-md-10 col-lg-8 my-0' >                
                {errorMessage? <div className='alert alert-danger text-center mx-3 my-2 p-1'>{errorMessage}</div> : 
                
                operationsList
                .filter((operation) => props.fonctionnalite=='previsions'? operation.isconfirmed==0 : operation.isconfirmed==1)
                .filter((operation) => operation.idtypeops.includes(selectedOperation))
                .filter((operation) => new Date(operation.dateops).getTime() >= dateFrom.getTime() && 
                                        new Date(operation.dateops).getTime() <= dateTo.getTime())
                
                .map((operation, index) => 
                    
                    (
                        
                        <li key={index}  className='d-flex gap-2 justify-content-between bg-success bg-opacity-25 mx-auto '>

                            <div className='ms-1'>{dateParser(operation.dateops)}</div>
                            <div className='d-flex flex-column w-50'>
                                <span className='text-success'>{operation.categorie}</span>
                                <span className=''> {operation.libelle}</span>
                            </div>
                            <div className='d-flex align-items-start'>
                                <span className='text-right text-danger'>{operation.montant} €</span>
                                <button onClick={()=>handleEdit(operation.id, 'editOperation')} className="btn col-1 py-0"><BsPencil /></button>
                                <button onClick={()=>props.fonctionnalite=='previsions' && handleEdit(operation.id, 'deletePrevision')} className="btn "><BsTrash /></button>
                            </div>
                            <div className="d-none">{calculSomme(operation.montant)}</div>
                        </li>
                    )
                    
                )}   
            </ul>
            <div className='total-line bg-primary '>
                <span className='col-3'></span>
                <span className='col-4'>Total</span>
                <span className='col-3'>{parseFloat(totalMontant).toFixed(2)} €</span>
                <span className='col-2'></span>
            </div>
            
            {showSaisieForm.value && <SaisieForm fonctionnalite={props.fonctionnalite} />}
                
        </div>
    );
};

export default Page;