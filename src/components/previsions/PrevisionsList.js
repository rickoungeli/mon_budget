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

const PrevisionsList = () => {
    const dispatch = useDispatch();
    

    

    return (
        <ul className='ul-scrolling bg-success bg-opacity-25  col-12 col-md-10 col-lg-8'> 
        {showDialogBox && <Dialog />}               
        {errorMessage? <div className='alert alert-danger text-center col-12 col-md-10 col-lg-8 mx-auto my-2 p-1'>{errorMessage}</div> :
            
            previsions
            .filter((prevision) => prevision.idtypeops.includes(selectedOperation))
            .filter((prevision) => new Date(prevision.dateops).getTime() >= dateFrom.getTime() && 
                                    new Date(prevision.dateops).getTime() <= dateTo.getTime())
            .map((prevision, index) => (
                <li key={index}  className='row no-gutters border-bottom'>
                    <div className='col-3'>{dateParser(prevision.dateops)}</div>
                    <div className='col-5 d-flex flex-column'>
                        <span className='text-success'>{prevision.categorie}</span>
                        <span className=''>{prevision.libelle}</span>
                    </div>
                    <div className='col-2 d-flex flex-column'>
                        <span className='text-success'></span>
                        <span className='text-right text-danger'>{prevision.montant} € </span>
                    </div>
                    <div className='col-2 d-flex'>
                        <button onClick={()=>dispatch(SHOW_SAISIE_FORM({value:true, ops:'editPrevision', id:prevision.id}))} className="btn py-0"><BsPencil /></button>
                        <button onClick={()=>dispatch(DIALOG_BOX({showDialogBox:true, previsionId:prevision.id}))} className="btn "><BsTrash /></button>

                    </div>
                </li>
            ))}   
        </ul>
    );
};

export default PrevisionsList;