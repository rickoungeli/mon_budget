import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa' ;
import { FaHome } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [user, setUser] = useState(localStorage.getItem('userId'))
    const [isMobile, setIsMobile] = useState(false);

    const handleDisconnect = () => {
        localStorage.clear()
        setUser('')
        window.location='./'
    }
    
    return (
        <nav className='nav_bar bg-dark'>
            <Link to = '/' className="navlink"><h3 className="logo">Logo</h3></Link>
            {user? <>
            <ul className= {isMobile? "navlinks-mobile bg-dark" : "navlinks  bg-dark"} onClick = {() => setIsMobile(false)}>
               
                <li className="nav-item border-bottom fs-5">
                    <Link to = '/previsions' className="nav-link">Les Prévisions</Link>
                </li>
                <li className="nav-item  border-bottom fs-5">
                    <Link to = '/depenses' className="nav-link">Les dépenses effectuées</Link>
                </li>
                <li className="nav-item  border-bottom fs-5">
                    <Link to = '/categories' className="nav-link">Gérer les categories</Link>
                </li>
                
                <li className="nav-item  border-bottom fs-5">
                    <Link to = '/profil' className="nav-link">Profil</Link>
                </li>
                
                <li className="nav-item">
                    <button 
                        onClick = {() => handleDisconnect()}
                        className="nav-link bg-dark border border-dark fs-5">Se déconnecter
                    </button> 
                    
                </li>
            </ul>
            
            <button className="mobile-menu-icon" onClick = {() => setIsMobile(!isMobile)}>
                {isMobile ? <FaTimes className='fs-2'/> : <FaBars className='fs-2'/>}
            </button>
            </>:
            <Link to = '/login' className="nav-link">Se connecter</Link>
            }
        </nav>
    );
};

export default Navbar;