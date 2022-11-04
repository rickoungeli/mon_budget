import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

//Import from features
import { SHOW_SAISIE_FORM, LOAD_OPERATIONS, OPERATIONS_LIST } from '../../features/operationsReducer';
import { selectShowSaisieForm, selectOperationsList } from '../../features/operationsReducer';
import { DELETED_ID, selectFonctionnality } from '../../features/homeReducer';

//Import from react-icons
import { AiFillExclamationCircle } from 'react-icons/ai';

import { useCheckLibelle } from '../../utils/controllers';


const PrevisionForm = (props) => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('userId')
    const operations = JSON.parse(localStorage.getItem('operations'));
    const categories = JSON.parse(localStorage.getItem('categories'));

    const showSaisieForm = useSelector(selectShowSaisieForm);
    const fonctionnalite = useSelector(selectFonctionnality);
    const operationsList = useSelector(selectOperationsList)

    const todaysdate = (new Date().toLocaleDateString()).split('/');
    const todays = todaysdate[2]+'-'+todaysdate[1]+'-'+todaysdate[0];
    const [libelle, setLibelle] = useState('')
    const [dateOps, setDateOps] = useState(todays)
    const [idTypeOps, setIdTypeOps] = useState('D');
    const [idCategorie, setIdCategorie] = useState(categories[0].id);
    const [montant, setMontant] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [alert, setAlert] = useState('')
    const [libelleMessage, setLibelleMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [dateOpsMessage, setDateOpsMessage] = useState('')
    const [montantMessage, setMontantMessage] = useState('')

    const data = new FormData()
    data.append('iduser', user)
    data.append('fonctionnalite', props.fonctionnalite)

    const arrayCompare = (arrayA, arrayB) => {
        for (let i = 0; i < arrayA.length; i++) {
            if (arrayA[i] !== arrayB[i]) {
                return false;
            }
        }
    };

    const checkLibelle = (libelle) => {
        if (!libelle) {
            setLibelleMessage("Le libelle est obligatoire");
            return true;
        } else if (libelle.length < 2 || libelle.length > 100) {
            setLibelleMessage("Veuillez taper un libelle valide svp");
            return true;
        } else {
            setLibelleMessage("");
            return false;
        }
    };
    
    const checkDateOps = (dateOps) => {
        if (!dateOps) {
            setDateOpsMessage("La date est obligatoire");
            return true;
        } else {
            setDateOpsMessage("");
            return false;
        }
    };
    
    const checkMontant = (montant) => {
        if (montant=="") {
            setMontantMessage("Le montant est obligatoire");
            return true;
        } else if (montant <= 0) {
            setMontantMessage("Le montant doit être supérieur à zéro");
            return true;
        } else {
            setMontantMessage("");
            return false;
        }
    };
    
    useEffect(() => { 
        if (showSaisieForm.ops=='editOperation' || showSaisieForm.ops=='deletePrevision') {
            setIdCategorie(showSaisieForm.operation.idcategorie)
            setIdTypeOps(showSaisieForm.operation.idtypeops)
            setLibelle(showSaisieForm.operation.libelle)
            setDateOps(showSaisieForm.operation.dateops)
            setMontant(showSaisieForm.operation.montant)
        }
    }, [])

    const handleDelete = () => {
        data.append('function', 'deletePrevision')
        data.append('idoperation', showSaisieForm.operation.id)
        axios.post(`${process.env.REACT_APP_API_URL}depenses.php`, data)
        .then(res => {
           if(res.data=='Prévision supprimée'){
                //
                let newOperationsList = []
                operationsList.map((operation) => {
                    if(operation.id !== showSaisieForm.operation.id){
                        newOperationsList.push(operation)
                    }  
                })
                dispatch(OPERATIONS_LIST(newOperationsList));
                dispatch(SHOW_SAISIE_FORM({showSaisieForm:false, ops:'', operation:{}}))                
           }
        })
        .catch(err => setAlert("L'opération a echoué "+ err))
    }

    //Fonction pour transformer une prévision en une opération effectuée
    const handleTransformPrevision = () => {
        data.append('function', 'transformPrevision')
        data.append('idoperation', showSaisieForm.operation.id)
        data.append('libelle', libelle)
        data.append('dateops', dateOps)
        data.append('idtypeops', idTypeOps)
        data.append('idcategorie', idCategorie)
        data.append('montant', montant)
        axios.post(`${process.env.REACT_APP_API_URL}depenses.php`, data)
        .then(res => {
            if(res.data=='Prévision transformée!'){ 
                setAlert(res.data)
                //dispatch(LOAD_OPERATIONS(true))
                //On supprime la prévision dans le store



                setTimeout(()=> {
                    setAlert('')
                    setLibelle('')
                    setMontant('')
                    dispatch(SHOW_SAISIE_FORM({value:false, ops:'', operation:{}}))
                }, 2000)             
            }
        })
        .catch(err => setAlert("L'opération a echoué "+ err))
    }
        
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkLibelle1 = checkLibelle(libelle)
        const checkDateOps1 = checkDateOps(dateOps)
        const checkMontant1 = checkMontant(montant)
        const checkResultArray=[checkLibelle1, checkDateOps1, checkMontant1]
        
        if ( arrayCompare(checkResultArray, [false, false, false]) !== false) {
            showSaisieForm.operation? data.append('idoperation', showSaisieForm.operation.id):null
            data.append('libelle', libelle)
            data.append('montant', montant)
            data.append('dateops', dateOps)
            data.append('idtypeops', idTypeOps)
            data.append('idcategorie', idCategorie)
            showSaisieForm.ops == 'newOperation' && data.append('function', 'insertOperation')
            showSaisieForm.ops == 'editOperation' && data.append('function', 'editOperation')
            
            axios.post(`${process.env.REACT_APP_API_URL}depenses.php`, data)
            .then(res => {
                if(res.data=='') {
                    setAlert("Echec : l'opération n'a pas réussi")
                } else if(res.data=='Opération enregistrée !' || res.data=='Modification enregistrée'){
                    setAlert(res.data)
                    if(showSaisieForm.ops=='newOperation') {
                        //c'est une création on recharge les opérations
                        dispatch(LOAD_OPERATIONS(true))
                    } else {
                        //c'est une modification, on modifi dans le store
                        let newOperationsList = []
                        newOperationsList.push({
                            id:showSaisieForm.operation.id,
                            libelle:libelle,
                            dateOps:dateOps,
                            idCategorie:idCategorie,
                            idTypeOps:idTypeOps,
                            montant:montant
                        })
                        operationsList.map((operation) => {
                            if(operation.id !== showSaisieForm.operation.id){
                                newOperationsList.push(operation)
                            }  
                        })
                        dispatch(OPERATIONS_LIST(newOperationsList));
                    }
                    setTimeout(()=> {
                        setAlert('')
                        !checkbox && setLibelle('')
                        !checkbox && setMontant('')
                        checkbox && setDateOps('')
                        showSaisieForm.ops=='editOperation'? dispatch(SHOW_SAISIE_FORM({value:false, ops:'', operation:{}})):null
                    }, 2000)
                }
            })
            .catch(err => setAlert("L'opération a echoué "+ err))
        
            
        }
    }

    return (
        <div className="saisie-form overlay">
            <div className="modal-dialog bg-dark w-100 mx-auto">
                <div className="modal-content">
                    <div className="modal-header bg-light p-1">
                        <div>
                            <h5 className="modal-title text-center text-dark">
                                {showSaisieForm.ops == 'newOperation' && props.fonctionnalite=='previsions'? "Saisie d'une prévision" : null} 
                                {showSaisieForm.ops == 'newOperation' && props.fonctionnalite=='depenses'? "Saisie d'une opération effectuée" : null} 
                                {showSaisieForm.ops == 'editOperation' && props.fonctionnalite=='previsions'? "Modification d'une prévision" : null}
                                {showSaisieForm.ops == 'editOperation' && props.fonctionnalite=='depenses'? "Modification d'une opération effectuée" : null}
                                {showSaisieForm.ops == 'deletePrevision' ? "Voulez-vous enregistrer cette prévision comme une opération effectuée?" : null}
                                
                            </h5>
                            {showSaisieForm.ops == 'deletePrevision' ? <small className='d-block text-center mb-1 fs-6'>(si vous cliquez sur non, la prévision sera supprimée)</small> : null}

                        </div>
                        <button type="button" className="close bg-danger border border-secondary px-3 text-light rounded" onClick={()=> dispatch(SHOW_SAISIE_FORM({value:false, ops:'', operation:{}}))}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
            
                        <form onSubmit={(e) => handleSubmit(e)} className="row no-gutters m-3 px-2 py-1 mb-0 scroller">
                            {/* Choix opération */}
                            <div className='groupe-type-operation d-flex text-white mb-3'>
                                <p className='mb-0'>Types d'opérations :</p>
                                { operations.map((operation) => (
                                    <label htmlFor={operation.id} key={operation.id} className='form-check-label'>
                                        <input 
                                            type="radio" 
                                            value={operation.id} 
                                            id={operation.id} 
                                            className='form-check-input ms-3' 
                                            name = 'idTypeOps'
                                            onChange={e => setIdTypeOps(e.target.value)} 
                                            defaultChecked = {operation.id == idTypeOps? 'checked':null}
                                        />
                                        {operation.libelle}
                                    </label> 
                                )) }
                            </div>

                            {/* Choix catégorie */}
                            <div className="d-flex mb-2">
                                <label htmlFor="categorie" className='text-white me-2'>Categorie :</label>
                                <select 
                                    id="categorie" 
                                    name = 'idCategorie'  
                                    value={idCategorie}
                                    onChange={e => setIdCategorie(e.target.value)}
                                    className="rounded" 
                                    >
                                    {categories
                                        .filter(categorie => categorie.typeOps.includes(idTypeOps))
                                        .map((categorie) => (
                                        <option value={categorie.id} key={categorie.id} >{categorie.libelle} </option>
                                    ))}                         
                                </select>
                            </div>

                            {/* Libellé opération */}
                            <div className="form-group d-flex flex-column mb-0">
                                <label htmlFor="libelle" className='text-white me-2'>Libellé :</label>
                                <input 
                                    type="text" 
                                    id='libelle'
                                    name = 'libelle' 
                                    value = {libelle}
                                    onChange={e => setLibelle(e.target.value)} 
                                    className={
                                        libelleMessage? "form-control border border-2 border-danger" : 
                                        ((showSaisieForm.ops=='deletePrevision' || showSaisieForm.ops=='deleteOperation')? "form-control disabled" : "form-control")
                                    }
                                />
                            </div>
                            {libelleMessage && <p className='text-danger'>{libelleMessage}</p>}
                            
                            {/* Date de l'opération */}
                            <div className="groupe-date-debut d-flex flex-column mb-0">
                                <label htmlFor="date-ops" className='text-white'>Date de l'opération :</label>
                                <input 
                                    type="date" 
                                    id='date-ops' 
                                    name = 'dateOps'
                                    value={dateOps}
                                    onChange={e => setDateOps(e.target.value)} 
                                    className={
                                        dateOpsMessage? "form-control border border-2 border-danger" : 
                                        ((showSaisieForm.ops=='deletePrevision' || showSaisieForm.ops=='deleteOperation')? "form-control disabled" : "form-control")
                                    }
                                />
                            </div>
                            {dateOpsMessage && <span className='text-danger'>{dateOpsMessage}</span>}

                            {/* Coût de l'opération */}
                            <div className="form-group d-flex flex-column mb-0" >
                                <label htmlFor="montant" className='text-white'>Montant :</label>
                                <input 
                                    type="text" 
                                    id='montant'
                                    name = 'montant' 
                                    value = {montant}
                                    onChange={e => setMontant(e.target.value)} 
                                    className={
                                        montantMessage? "form-control border border-2 border-danger" : 
                                        ((showSaisieForm.ops=='deletePrevision' || showSaisieForm.ops=='deleteOperation')? "form-control disabled" : "form-control")
                                    }
                                />
                            </div>
                            {montantMessage && <span className='text-danger'>{montantMessage}</span>}
                            
                            {
                                showSaisieForm.ops=='newOperation' && 
                                <div className="form-group d-flex mb-0" >
                                    <input 
                                        type="checkbox" 
                                        id='checkbox'
                                        name = 'checkbox' 
                                        value = {checkbox}
                                        onChange={e => setCheckbox(e.target.value)} 
                                        className='text-start'
                                    />
                                    <label htmlFor="checkbox" className='text-white'>Enregistrer encore cette opération</label>

                                </div>
                            }


                            <div className="d-flex justify-content-center gap-2 my-2 ">
                                {showSaisieForm.ops=='deletePrevision' && <button onClick={()=>{handleTransformPrevision()}} className='btn btn-primary'>Oui</button>}
                                <button onClick={(e)=>{showSaisieForm.ops=='deletePrevision' ? handleDelete() : handleSubmit(e)}} className={showSaisieForm.ops=='deletePrevision' ? 'btn btn-danger' : "btn btn-primary"} >
                                    {showSaisieForm.ops=='deletePrevision' ? 'non' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                        
                        
                        { alert && <p className='alert alert-success p-1'>{alert}</p> }
                            
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PrevisionForm;