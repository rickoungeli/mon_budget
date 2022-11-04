import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
//import { useForm } from "react-hook-form";
//Import from features
import { SHOW_PREVISION_FORM, LOAD_PREVISIONS, selectShowPrevisionForm } from '../../features/previsionReducer';
//Import from react-icons
import { AiFillExclamationCircle } from 'react-icons/ai';


const PrevisionForm = () => {
    const dispatch = useDispatch();
    const showPrevisionForm = useSelector(selectShowPrevisionForm);
    const user = localStorage.getItem('userId')
    const operations = JSON.parse(localStorage.getItem('operations'));
    const categories = JSON.parse(localStorage.getItem('categories'));
    const todaysdate = (new Date().toLocaleDateString()).split('/');
    const todays = todaysdate[2]+'-'+todaysdate[1]+'-'+todaysdate[0];
    //let lastday = todaysdate[2]+'-'+todaysdate[1]+'-'+'30';
    //const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const [idTypeOps, setIdTypeOps] = useState('D');
    const [idCategorie, setIdCategorie] = useState('');
    const [libelle, setLibelle] = useState('')
    const [dateOps, setDateOps] = useState(todays)
    const [montant, setMontant] = useState('')
    const [alert, setAlert] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errors, setErrors] = useState ({
        libelle: '',
        dateOps: '',
        montant: ''
    })

    //Fonction pour récupérer une prévision
    const getPrevision = () => {
        axios.get(`${process.env.REACT_APP_API_URL}previsions.php?function=getOnePrevision&id=${showPrevisionForm.id}`)
        .then (res => {
            setIdCategorie(res.data.idcategorie)
            setIdTypeOps(res.data.idtypeops)
            setLibelle(res.data.libelle)
            setDateOps(res.data.dateops)
            setMontant(res.data.montant)
            setErrorMessage("");
            
        })
        .catch(err => {
            setErrorMessage("Une erreur s'est produite" + err);
        })   
    }

    useEffect(() => { 
        if (showPrevisionForm.ops=='edit') {
            getPrevision()
        }
    }, [])
        
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('iduser', user) 
        data.append('libelle', libelle)
        data.append('montant', montant)
        data.append('dateops', dateOps)
        data.append('idtypeops', idTypeOps)
        data.append('idcategorie', idCategorie)
        showPrevisionForm.ops == 'edit' ? data.append('function', 'editPrevision'): data.append('function', 'insertPrevision')
        showPrevisionForm.ops == 'edit' && data.append('idprevision', showPrevisionForm.id)

        axios.post(`${process.env.REACT_APP_API_URL}previsions.php`, data)
        .then(res => {
            console.log(res)
            if(res.data=='') {
               setAlert("Echec : l'opération n'a pas réussi")
            } else {
                if(res.data==='Prévision enregistrée !' || res.data==='Modification enregistrée'){
                    setAlert(res.data)
                    dispatch(LOAD_PREVISIONS(true))
                    setTimeout(()=> {
                        setAlert('')
                        showPrevisionForm.ops=='edit' && dispatch(SHOW_PREVISION_FORM({value:false, ops:'', id:''}))
                    }, 2000)
                }
                setAlert(res.data)
            }
        })
        .catch(err => setAlert("L'opération a echoué "+ err))    
            
    }

    return (
        <div className="overlay">
            <div className="modal-dialog bg-dark w-75 mx-auto">
                <div className="modal-content">
                    <div className="modal-header bg-light p-3">
                        <h5 className="modal-title text-center text-dark">{showPrevisionForm.ops == 'new'? "Saisie d'une prévision" : "Modification d'une prévision"}</h5>
                        <button type="button" className="close bg-danger border border-secondary px-3 text-light rounded" onClick={()=> dispatch(SHOW_PREVISION_FORM({value:false, type:'', id:''}))}>
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
                                    className="rounded" 
                                    name = 'idCategorie'  
                                    defaultValue={idCategorie}
                                    onChange={e => setIdCategorie(e.target.value)}
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
                                    defaultValue = {libelle}
                                    onChange={e => setLibelle(e.target.value)} 
                                    className={errors.libelle? "form-control border border-2 border-danger" : "form-control"} />
                            </div>
                            {errors.libelle && <p className='text-danger'>{errors.libelle}</p>}
                            
                            {/* Date de l'opération */}
                            <div className="groupe-date-debut d-flex flex-column mb-0">
                                <label htmlFor="date-ops" className='text-white'>Date de l'opération :</label>
                                <input 
                                    type="date" 
                                    id='date-ops' 
                                    name = 'dateOps'
                                    value={dateOps}
                                    onChange={e => setDateOps(e.target.value)} 
                                    className={errors.dateOps? "form-control border border-2 border-danger" : "form-control"}
                                />
                            </div>
                            {errors.dateOps && <span className='text-danger'>{errors.dateOps}</span>}

                            {/* Coût de l'opération */}
                            <div className="form-group d-flex flex-column mb-0">
                                <label htmlFor="montant" className='text-white'>Montant :</label>
                                <input 
                                    type="text" 
                                    id='montant'
                                    name = 'montant' 
                                    defaultValue = {montant}
                                    onChange={e => setMontant(e.target.value)} 
                                    className={errors.montant? "form-control border border-2 border-danger" : "form-control"}
                                />
                            </div>
                            {errors.montant && <span className='text-danger'>{errors.montant}</span>}

                            <div className="col-12 text-center mb-3 " id="form-group3">
                                <button className="btn btn-primary" >Enregistrer</button>
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