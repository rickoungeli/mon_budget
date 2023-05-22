import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaCreativeCommonsRemix } from "react-icons/fa";
import axios from 'axios';


const Home = () => {
    const [page, setPage] = useState('')
    const [user, setUser] = useState(localStorage.getItem('userId'))
    

    return (
        <div>
            <h1 className='text-center mt-1'>BIENVENUE SUR LA GESTION DE VOTRE BUDGET</h1>
            <section className='mt-4 p-3'>
                <h2 className='fs-3 text-start'>Gérez vos prévisions budgétaires</h2>
                <span className='bg-success'><FaCreativeCommonsRemix/></span>
                <p className='fs-3 text-start'>Enregistrez vos revenus ainsi que vos dépenses de chaque mois et vous aurez, dans la rubrique prévisions, la liste ainsi que le total de ce que vous gagnez et dépenez</p>
                {user &&
                    <div className='text-center' >
                        <Link to = '/previsions' className="btn btn-primary">GERER LES PREVISIONS</Link>
                    </div>
                }
            </section>
            <section className='bg-dark text-light p-3'>
                <h2 className='fs-3 text-start'>Les dépenses effectuées</h2>
                <span className='bg-success'><FaCreativeCommonsRemix/></span>
                <p className='fs-3 text-start'>Convertisses les prévisions en dépenses effectuées ou enregistrez les directement dans la rubrique dépenses. Cette rubrique vous affiche la liste de toutes vos dépenses du mois ou pour la prériode que vous choisissez</p>
                {user &&
                    <div className='text-center'>
                        <Link to = '/depenses' className="btn btn-warning">GERER LES DEPENSES</Link>
                    </div>
                }
            </section>
            <section className='bg-info text-dark p-3'>
                <h2 className='fs-3 text-start'>Les categories d'opérations</h2>
                <span className='bg-success'><FaCreativeCommonsRemix/></span>
                <p className='fs-3 text-start'>Vous devez créer les classes d'opérations avant de pouvoir gérer votre budget</p>
                {user &&
                    <div className='text-center '>
                        <Link to = '/categories' className="btn btn-success text-warning">GERER LES CATEGORIES</Link>
                    </div>
                }
            </section>
        </div>
    );
};

export default Home;