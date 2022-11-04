import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ConnectMenu from './ConnectMenu';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const toggleMenu = () => {
        setShowNavbar(!showNavbar)
    }
    return (
        <nav className='navbar' role="navigation">
            <div className='logo_container'>
                <button className="burger" onClick={toggleMenu}>
                    <span className="bar"></span>
                </button>
                <div className="logo">Logo</div>
            </div>
            {showNavbar &&  <ul className="link-container">
                <li className="link"><NavLink to='/' onClick={toggleMenu}>Accueil</NavLink></li>
                <li className="link"><NavLink to='/acb92'>Les ACB92</NavLink>
                
                </li>
                <li className="link"><NavLink to='/projet2022'>Projet2022</NavLink>
                
                </li>
                <li className="link"><NavLink to='/profil'>Profil</NavLink></li>
                <li className="link"><NavLink to='/contact' onClick={toggleMenu}>Contact</NavLink></li>
            </ul>}
            <ConnectMenu />
        </nav>
    );
};

export default Navbar;