import React, {useState}  from 'react';
import { NavLink } from 'react-router-dom';
//import Navbar from './Navbar';


const Header = () => {
    const [user, setUser] = useState(localStorage.getItem('userId'))
    const [pseudo, setPseudo] = useState(localStorage.getItem('userPseudo'))

    const handleDisconnect = () => {
        localStorage.clear()
        setUser('')
        setPseudo('')
        window.location='/'
    }

    return (
        <header className='mainHeader row justify-content-between p-2'>
            <NavLink to = '/' className="navlink col-2"><h3 className="">{pseudo}</h3></NavLink>
            <h4 className="text-center m-0 fw-bold col-7">GESTION DU BUDGET</h4>
            {user? 
                <button onClick = {() => handleDisconnect()} className="col-3 text-light px-2 fs-6 bg-primary border-primary">Déconnexion</button> 
                :
                <NavLink to = '/login' className="nav-link col-2">Se connecter</NavLink>
            }
        </header>
    );
};

export default Header;