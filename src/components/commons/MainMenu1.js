import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userReducer";
import { FaBars } from 'react-icons/fa' ;

const MainMenu = () => {
    const user = useSelector(selectUser)

    return (
        <nav className="mainMenu navbar navbar-expand-md navbar-light m-0 p-0">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span ><FaBars className="burger-menu"/></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav text-white">
                    <NavLink to='/'><li className="nav-item nav-link my-0" aria-current="page">Accueil</li></NavLink>
                    {user &&                        
                        <li className="nav-item dropdown">
                            <a className="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Les ACB92
                            </a>
                            <ul className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown">
                                <NavLink to='/liste-des-membres'><li className="dropdown-item">Les membres du groupe</li></NavLink>
                                <li><hr className="dropdown-divider" /></li>
                                <NavLink to='/liste-des-eleves'><li className="dropdown-item">Les élèves de la promotion</li></NavLink>
                            </ul>
                        </li>
                    }
                    {user &&
                        <li className="nav-item dropdown">
                            <a className="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Projet2022
                            </a>
                            <ul className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown">
                                <NavLink to='/projet2022'><li className="dropdown-item">Liste des inscrits</li></NavLink>
                                <li><hr className="dropdown-divider" /></li>
                                <NavLink to='/activites'><li className="dropdown-item">Les proposition d'activités</li></NavLink>
                                <li><hr className="dropdown-divider" /></li>
                                <NavLink to='/actionnaires'><li className="dropdown-item">Les Actionnaires</li></NavLink>
                                <NavLink to='/statuts'><li className="dropdown-item">Les Statuts de l'entreprise</li></NavLink>
                            </ul>
                        </li>
                    }
                </ul>
            </div>

        </nav>
    );
};

export default MainMenu;