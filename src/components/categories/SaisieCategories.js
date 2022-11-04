import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
//Import from features
import { loadCategories, selectShowCategoriesForm, showCategoriesForm } from '../../features/categoriesReducer';
//Import from react-icons
import { AiFillExclamationCircle } from 'react-icons/ai';


const CategorieForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const user = localStorage.getItem('userId')
    const operations = JSON.parse(localStorage.getItem('operations'));
    const [alert, setAlert] = useState('');
    
    const onSubmit = data => {
        const data1 = new FormData()
        data1.append('function', 'insertCategorie')
        data1.append('userId', data.userId) 
        data1.append('libelle', data.libelle)
        data1.append('typeOps', data.typeOps)

        axios.post(`${process.env.REACT_APP_API_URL}categories.php`, data1)
        .then(res => {
            if(res.data=='') {
               setAlert("Echec : l'opération n'a pas réussi")
            } else {
                if(res.data==='Categorie enregistrée !' || res.data==='La modification est enregistrée avec succèss'){
                    setAlert(res.data)
                    dispatch(loadCategories(true))
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
                        <h5 className="modal-title text-center text-dark">Saisie d'une categorie</h5>
                        <button 
                            type="button" 
                            className="close bg-danger border border-secondary px-3 text-light rounded" 
                            onClick={()=> dispatch(showCategoriesForm())}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {alert && <p className='alert alert-danger p-1'>{alert}</p> }
                        <form onSubmit={handleSubmit(onSubmit)} className="row no-gutters m-3 px-2 py-1 mb-0 scroller">
                            {/* Choix opération */}
                            <div className='groupe-type-operation d-flex text-white mb-3'>
                                <p className='mb-0'>Types d'opérations :</p>
                                {operations.map((operation) => (
                                    <label htmlFor={operation.id} key={operation.id} className='form-check-label'>
                                        <input 
                                            type="radio" 
                                            value={operation.id} 
                                            id={operation.id} 
                                            className='form-check-input ms-3' 
                                            {...register('selectedOperation')}  
                                            defaultChecked = {(operation.id == 'R') && 'checked'}
                                        />
                                        {operation.libelle}
                                    </label> 
                                ))}  
                            </div>
                            
                            {/* Libellé catégorie */}
                            <div className="form-group d-flex flex-column mb-0">
                                <label htmlFor="libelle" className='text-white me-2'>Libellé :</label>
                                <input 
                                    type="text" 
                                    id='libelle'
                                    {...register('libelle', {
                                        required:'Le libellé est requis', 
                                        minLength: {value:2, message: 'Vous devez entre au moins deux caractères'},
                                        maxLength: {value: 255, message: ''}
                                    })}
                                    className={errors.libelle? "form-control border border-2 border-danger" : "form-control"}/>
                            </div>
                            {errors.libelle && <p className='text-danger'>{errors.libelle.message}</p>}
                            
                            <input 
                                type="hidden" 
                                id='userId'
                                value={user.id}
                                {...register('userId')} 
                            />
                            <div className="col-12 text-center mb-3 " id="form-group3">
                                <button className="btn btn-primary" >Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CategorieForm;