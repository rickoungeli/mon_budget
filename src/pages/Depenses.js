import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import axios from 'axios';
import { SHOW_SAISIE_FORM, LOAD_OPERATIONS_LIST } from '../features/operationsReducer';
import { selectOperationsList, selectShowSaisieForm, selectLoadOperationList, selectSelectedOperation, selectDateFrom, selectDateTo } from "../features/operationsReducer";
import DatesAndOperationsForm from '../components/commons/DatesAndOperationsForm';
import SaisieForm from '../components/commons/SaisieForm';
import { dateParser } from '../utils/controllers';

const Depenses = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('userId')
    const showSaisieForm = useSelector(selectShowSaisieForm)
    const loadOperationsList = useSelector(selectLoadOperationList)
    const selectedOperation = useSelector(selectSelectedOperation)
    let dateFrom = new Date(useSelector(selectDateFrom))
    let dateTo = new Date(useSelector(selectDateTo))
    const [depenses, setDepenses] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    console.log(selectOperationsList);
    //Récupération de la liste des dépenses effectuées
    useEffect(() => { 
        if (loadOperationsList ) {
            axios.get(`${process.env.REACT_APP_API_URL}depenses.php?function=getDepenses&iduser=${user}`)
            .then (res => {
                console.log(res);
                !res.data? setErrorMessage('Aucune opération trouvée') : setDepenses(res.data);
                //setErrorMessage("");
                dispatch(LOAD_OPERATIONS_LIST(false));
            })
            .catch(err => {
                setErrorMessage("Une erreur s'est produite" + err);
            })
        } else {
            setDepenses(selectOperationsList)
        }
    }, [loadOperationsList, selectedOperation, dateFrom, dateTo, selectOperationsList])


    return (
        <div className='page row no-gutters col-12'>
            <div className="page-titre d-flex justify-content-between px-2">
                <h4 className='text-center my-2'>Liste des dépenses</h4>
                <button className="btn btn-primary m-1" onClick={() => dispatch(SHOW_SAISIE_FORM({value:true, ops:'newOperation', id:''}))}>Ajouter une opération</button>
            </div>

            <DatesAndOperationsForm />
            
            <ul className='ul-scrolling bg-success bg-opacity-25  col-11 col-md-10 col-lg-8 mx-auto' >                
                {errorMessage? <div className='alert alert-danger text-center mx-3 my-2 p-1'>{errorMessage}</div> : 
                
                depenses
                .filter((depense) => depense.idtypeops.includes(selectedOperation))
                .filter((depense) => new Date(depense.dateops).getTime() >= dateFrom.getTime() && 
                                       new Date(depense.dateops).getTime() <= dateTo.getTime())
                .map((depense, index) => (
                    <li key={index}  className='row border-bottom'>
                        <div className='col-3'>{dateParser(depense.dateops)}</div>
                        <div className='col-4 d-flex flex-column'>
                            <span className='text-success'>{depense.categorie}</span>
                            <span className=''>{depense.libelle}</span>
                        </div>
                        <div className='col-3 d-flex flex-column'>
                            <span className='text-success'></span>
                            <span className='text-right text-danger'>{depense.montant} €</span>
                        </div>
                        <button onClick={()=>dispatch(SHOW_SAISIE_FORM({value:true, ops:'editOperation', id:depense.id}))} className="btn col-1 py-0"><BsPencil /></button>
                        <button onClick={()=>dispatch(SHOW_SAISIE_FORM({value:true, ops:'deleteOperation', id:depense.id}))} className="btn col-1"><BsTrash /></button>
                    </li>
                ))}   
            </ul>
            {showSaisieForm.value && <SaisieForm/>}
            
        </div>
    );
};

export default Depenses;