import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

//Import from features
import { LOAD_OPERATIONS, OPERATIONS_LIST } from '../../features/operationsReducer';
import { selectOperationsList } from '../../features/operationsReducer';

//Import from react-icons
import { AiFillExclamationCircle } from 'react-icons/ai';

import { useCheckLibelle } from '../../utils/controllers';

import { InputText } from '../formComponents/InputText';


const SaisieForm = ({showSaisieForm, toggleSaisieForm, fonctionnalite}) => {
    const dispatch = useDispatch()
    const user = localStorage.getItem('userId')
    const operations = JSON.parse(localStorage.getItem('typeOperations'));
    const categories = JSON.parse(localStorage.getItem('categories'));

    const operationsList = useSelector(selectOperationsList)
    
    const todaysdate = (new Date().toLocaleDateString()).split('/');
    const todays = todaysdate[2]+'-'+todaysdate[1]+'-'+todaysdate[0];
    const [libelle, setLibelle] = useState('')
    const [dateOps, setDateOps] = useState(todays)
    const [idTypeOps, setIdTypeOps] = useState('D');
    const [idCategorie, setIdCategorie] = useState(categories[0].id);
    const [libCat, setLibCat] = useState('')
    const [montant, setMontant] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [alert, setAlert] = useState('')
    const [libelleMessage, setLibelleMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [dateOpsMessage, setDateOpsMessage] = useState('')
    const [montantMessage, setMontantMessage] = useState('')
    
    const data = new FormData()
    data.append('iduser', user)
    data.append('fonctionnalite', fonctionnalite)

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
        if (showSaisieForm.operationType=='editOperation' || showSaisieForm.operationType=='deletePrevision') {
            setIdCategorie(showSaisieForm.operationItem.idcategorie)
            setIdTypeOps(showSaisieForm.operationItem.idtypeops)
            setLibelle(showSaisieForm.operationItem.libelle)
            setDateOps(showSaisieForm.operationItem.dateops)
            setMontant(showSaisieForm.operationItem.montant)
        }
    }, [])

    
    //Fonction pour transformer une prévision en une opération effectuée
    const handleTransformPrevision = () => {
        data.append('function', 'transformPrevision')
        data.append('idoperation', showSaisieForm.operationItem.id)
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
                    toggleSaisieForm(false, '', {})
                }, 2000)             
            }
        })
        .catch(err => setAlert("L'opération a echoué "+ err))
    }
    //Fonction pour supprimer une opération de la bdd
    const handleDelete = () => {
        const operationId = showSaisieForm.operationItem.id
        data.append('function', 'deletePrevision')
        data.append('idoperation', operationId)
        axios.post(`${process.env.REACT_APP_API_URL}operations.php`, data)
        .then(res => {
           if(res.data=='Prévision supprimée'){
               //On ferme le formulaire et on supprime l'item dans le store du parent
               toggleSaisieForm(false, 'deleteItemFromStore', showSaisieForm.operationItem)   
           }
        })
        .catch(err => setAlert("L'opération a echoué "+ err))
    }
    
    //Fonction pour créer ou modifier une opération dans la bdd
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkLibelle1 = checkLibelle(libelle)
        const checkDateOps1 = checkDateOps(dateOps)
        const checkMontant1 = checkMontant(montant)
        const checkResultArray=[checkLibelle1, checkDateOps1, checkMontant1]
        
        if ( arrayCompare(checkResultArray, [false, false, false]) !== false) {
            showSaisieForm.operationType=='editOperation'? data.append('idoperation', showSaisieForm.operationItem.id):null
            data.append('libelle', libelle)
            data.append('montant', montant)
            data.append('dateops', dateOps)
            data.append('idtypeops', idTypeOps)
            data.append('idcategorie', idCategorie)
            showSaisieForm.operationType == 'newOperation' && data.append('function', 'insertOperation')
            showSaisieForm.operationType == 'editOperation' && data.append('function', 'editOperation')
            
            axios.post(`${process.env.REACT_APP_API_URL}operations.php`, data)
            .then(res => {
                //console.log(res);
                if(res.data=='') {
                    
                    setAlert("Echec : l'opération n'a pas réussi")
                } else if(res.data=='Opération enregistrée !' || res.data=='Modification enregistrée'){
                    setAlert(res.data)
                    if(showSaisieForm.operationType=='newOperation') {
                        //c'est une création on recharge les opérations
                        dispatch(LOAD_OPERATIONS(true))
                        
                    } else {
                        //c'est une modification, 
                        //Je récupère le libelle catégorie
                        axios.get(`${process.env.REACT_APP_API_URL}categories.php?function=getLibelleCategorie&iduser=${user}&idcategorie=${idCategorie}`)
                        .then (res => {
                            if(!res.data) {
                                setErrorMessage("une erreur s'est produite...")
                            } else {
                                //dispatch(OPERATIONS_LIST(res.data))
                                //console.log(res.data);
                                //libelleCategorie = res.data
                                //On ferme le formulaire et on modifie l'item dans le store du parent
                                toggleSaisieForm(false, 'editItemFromStore', {
                                    id:showSaisieForm.operationItem.id,
                                    categorie:res.data.libelle,
                                    libelle:libelle,
                                    dateops:dateOps,
                                    idcategorie:idCategorie,
                                    idtypeops:idTypeOps,
                                    montant:montant
                                }) 
                            }
                        })
                        .catch(err => {
                            setErrorMessage("Une erreur s'est produite" + err);
                        })
                          
                    }
                    setTimeout(()=> {
                        setAlert('')
                        !checkbox && setLibelle('')
                        !checkbox && setMontant('')
                        checkbox && setDateOps('')
                        showSaisieForm.operationType=='editOperation'? toggleSaisieForm(false, '', {}):null
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
                                {showSaisieForm.operationType == 'newOperation' && fonctionnalite=='previsions'? "Saisie d'une prévision" : null} 
                                {showSaisieForm.operationType == 'newOperation' && fonctionnalite=='depenses'? "Saisie d'une opération effectuée" : null} 
                                {showSaisieForm.operationType == 'editOperation' && fonctionnalite=='previsions'? "Modification d'une prévision" : null}
                                {showSaisieForm.operationType == 'editOperation' && fonctionnalite=='depenses'? "Modification d'une opération effectuée" : null}
                                {showSaisieForm.operationType == 'deletePrevision' ? "Voulez-vous enregistrer cette prévision comme une opération effectuée?" : null}
                                
                            </h5>
                            {showSaisieForm.operationType == 'deletePrevision' ? <small className='d-block text-center mb-1 fs-6'>(si vous cliquez sur non, la prévision sera supprimée)</small> : null}

                        </div>
                        <button type="button" className="close bg-danger border border-secondary px-3 text-light rounded" onClick={()=> toggleSaisieForm(false, '', '')}>
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
                                    onChange={(e) => {
                                        setIdCategorie(e.target.value)
                                        setLibCat(e.target.libelle)
                                    
                                    }}
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
                            {/* <div className="form-group d-flex flex-column mb-0">
                                <label htmlFor="libelle" className='text-white me-2'>Libellé :</label>
                                <input 
                                    type="text" 
                                    id='libelle'
                                    
                                />
                            </div> */}

                            <InputText 
                                type='text'
                                id='libelle' 
                                label='Libelle :'
                                name = 'libelle' 
                                value = {libelle}
                                onChange={setLibelle} 
                                className={
                                    libelleMessage? "form-control border border-2 border-danger" : 
                                    ((showSaisieForm.operationType=='deletePrevision' || showSaisieForm.operationType=='deleteOperation')? "form-control disabled" : "form-control")
                                }

                            />

                            {libelleMessage && <p className='text-danger'>{libelleMessage}</p>}
                            
                            {/* Date de l'opération */}
                                <InputText 
                                    type="date" 
                                    id='date-ops' 
                                    label="Date de l'opération :"
                                    name = 'dateOps'
                                    value={dateOps}
                                    onChange={setDateOps} 
                                    className={
                                        dateOpsMessage? "form-control border border-2 border-danger" : 
                                        ((showSaisieForm.operationType=='deletePrevision' || showSaisieForm.operationType=='deleteOperation')? "form-control disabled" : "form-control")
                                    }
                                />
                            {dateOpsMessage && <span className='text-danger'>{dateOpsMessage}</span>}

                            {/* Coût de l'opération */}
                            
                                
                                <InputText 
                                    type='text'
                                    label="Montant :" 
                                    id='montant'
                                    name = 'montant' 
                                    value = {montant}
                                    onChange={setMontant} 
                                    className={
                                        montantMessage? "form-control border border-2 border-danger" : 
                                        ((showSaisieForm.operationType=='deletePrevision' || showSaisieForm.operationType=='deleteOperation')? "form-control disabled" : "form-control")
                                    }
                                />
                            
                            {montantMessage && <span className='text-danger'>{montantMessage}</span>}
                            
                            {
                                showSaisieForm.operationType=='newOperation' && 
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
                                {showSaisieForm.operationType=='deletePrevision' && <button onClick={()=>{handleTransformPrevision()}} className='btn btn-primary'>Oui</button>}
                                <button onClick={(e)=>{showSaisieForm.operationType=='deletePrevision' ? handleDelete() : handleSubmit(e)}} className={showSaisieForm.operationType=='deletePrevision' ? 'btn btn-danger' : "btn btn-primary"} >
                                    {showSaisieForm.operationType=='deletePrevision' ? 'non' : 'Enregistrer'}
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

export default SaisieForm;