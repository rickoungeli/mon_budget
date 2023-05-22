import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
//import { useForm } from "react-hook-form"; //Cette librairie permet de gérer les formulaires avec react
import { loadCategories, showCategoriesForm, selectLoadCategories, selectShowCategoriesForm } from '../features/categoriesReducer';
import SaisieCategories from '../components/categories/SaisieCategories';

const Categories = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('userId')
    const [categories, setCategories] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    //let loadCategoriesTrue = useSelector(selectLoadCategories)
    const operations = JSON.parse(localStorage.getItem('operations')) 
    const saisieCategories = useSelector(selectShowCategoriesForm)

    //Récupération de la liste des categories
    /*
    useEffect(() => { 
        if (loadCategoriesTrue) {
            setCategories(JSON.parse(localStorage.getItem('categories'))) 
            dispatch(loadCategories(false));
        }
    }, [loadCategoriesTrue])
    */
    const handleEditCategorie = (id) => {

    }

    const handleDeleteCategorie = (id) => {

    }
    
    return (
        <div>
            
            <div className="d-flex justify-content-between ps-2">
                <h4 className='text-center my-2'>LISTE DES CATEGORIES</h4>
            </div>
            { saisieCategories && <SaisieCategories/> }

            {/* Choix opération */}
            <form className="w-100 d-flex justify-content-between col-12 col-md-10 col-lg-8 mx-auto rounded-2 bg-success text-light p-2">
                <div className='d-flex text-white mb-3'>
                    <p className='mb-0'>Types d'opérations :</p>

                    {operations.map((operation) => (
                        <label htmlFor={operation.id} key={operation.id} className='form-check-label'>
                            <input 
                                type="radio" 
                                value={operation.id} 
                                id={operation.id} 
                                className='form-check-input ms-3' 
                                name = 'selectedOperation' 
                                defaultChecked = {(operation.id == 'R') && 'checked'}
                            />
                            {operation.libelle}
                        </label> 
                    )) }  
                </div>
                <button 
                    onClick={() => dispatch(showCategoriesForm())} 
                    className=' btn btn-primary '
                >
                    Ajouter une categorie
                </button>
            </form>

            {/* LISTE DES CATEGORIES */}
            <ul className='bg-success bg-opacity-25 col-12 col-md-10 col-lg-8 mx-auto'>                
                {/*categories
                .filter((categorie) => categorie.typeOps.includes(selectedOperation))
                .map((categorie, index) => (
                    <li key={index}  className='row no-gutters border-bottom'>
                        <div className='col-1'>{index+1}</div>
                        <div className='col-7'>{categorie.libelle}</div>
                        <button onClick={handleEditCategorie(categorie.id)} className='col-2 btn btn-primary '>Modifier</button>
                        <button onClick={handleDeleteCategorie(categorie.id)} className='col-2 btn btn-danger '>Supprimer</button>
                    </li>
                )) */ }   
            </ul>
        </div>
    );
};

export default Categories;