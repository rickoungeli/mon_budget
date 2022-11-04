import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userReducer";
import { FaBars } from 'react-icons/fa' ;
import { FaHome } from 'react-icons/fa';

const MainMenu = () => {
    const [user, setUser] = useState(localStorage.getItem('userId'))
    
    return (
        <nav className='mainMenu'>
            <h3 className="logo">Logo</h3>
            <ul className="nav-links">
                <li className="nav-item">
                    <NavLink to = '/previsions' className="nav-link">Les Prévisions</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to = '/depenses' className="nav-link">Les dépenses effectuées</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to = '/categories' className="nav-link">Gérer les categories</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to = '/profil' className="nav-link">Profil</NavLink>
                </li>
                <li className="nav-item">
                    {user?
                        <button className="nav-link">Se déconnecter</button> :
                        <NavLink to = '/login' className="nav-link">connecter</NavLink>
                    }
                </li>
            </ul>

        {/*
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavLink to = '/' className="navbar-brand" >LOGO</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>          
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to = '/previsions' className="nav-link">Les Prévisions</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to = '/depenses' className="nav-link">Les dépenses effectuées</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to = '/categories' className="nav-link">Gérer les categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to = '/profil' className="nav-link">Profil</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            
            

            {/*
            
            <ul className="mainMenu d-flex align-items-start">
                <li onClick={closeAllMenu} className=""><NavLink to='/'><FaHome className='d-block d-md-none'/><span className='d-none d-md-block'>Accueil</span></NavLink></li>
                <span className="menu-container" >
                    {user && <li onClick={toggleMenuAcb} className='menu-btn'>Les ACB92 </li> }
                            <ul className="menu-acb d-none">
                                <NavLink to='/liste-des-membres'><li className="" onClick={toggleMenuAcb}>Les membres du groupe</li></NavLink>
                                <hr className="" />
                                <NavLink to='/liste-des-eleves'><li className="" onClick={toggleMenuAcb}>Les élèves de la promotion</li></NavLink>
                            </ul>
                </span>
                
                <span className="menu-container" >
                {user && <li onClick={toggleMenuProjet} className="menu-btn">Projet2022</li>}
                        <ul className="menu-projet d-none">
                            <NavLink to='/projet2022'><li onClick={toggleMenuProjet} className="">Liste des inscrits</li></NavLink>
                            <hr className="" />
                            <NavLink to='/activites'><li onClick={toggleMenuProjet} className="">Les proposition d'activités</li></NavLink>
                            <hr className="" />
                            <NavLink to='/actionnaires'><li onClick={toggleMenuProjet} className="">Les Actionnaires</li></NavLink>
                            <hr className="" />
                            <NavLink to='/statuts'><li onClick={toggleMenuProjet} className="">Les Statuts de l'entreprise</li></NavLink>
                        </ul>
                    
                
                </span>
                {user && <li onClick={closeAllMenu} className=""><NavLink to='/profil'>Mon profil</NavLink></li>}
            </ul>
            */
            }
        </nav>
    );
};

export default MainMenu;