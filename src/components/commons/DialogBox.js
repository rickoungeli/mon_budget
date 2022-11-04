import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { LOAD_OPERATIONS_LIST } from '../../features/operationsReducer';


const Dialog = (props) => {
    const dispatch = useDispatch();
    //const showDialogBox = useSelector(selectShowDialogBox)
    


    

    

    return (
        <div className="overlay row">
            <div className='modal-dialog bg-success py-3 text-light w-75 px-1' 
                style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)' }}>
                <div className="modal-content d-flex flex-column align-items-center ">
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
                    <p className='modal-header text-center mb-0'>Voulez-vous enregistrer la prévision comme réalisée? </p>
                    <small className='d-block text-center mb-4'>(si vous cliquez sur non, la prévision sera supprimée)</small>
                    <div className='d-flex align-items-center gap-3'>
                        <button onClick={()=>{handleSavePrevision()}} className='btn btn-danger'>Oui</button>
                        <button onClick={()=>{handleDeletePrevision()}} className='btn btn-primary'>Non</button>
                    </div>
                    

                </div>
            </div>
        </div>
    );
};

export default Dialog;