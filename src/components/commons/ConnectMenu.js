import React from 'react';
import { NavLink } from 'react-router-dom';

const ConnectMenu = () => {
    const handleClick = ()=> {
        document.querySelector('.menu-projet').classList.add('d-none')
        document.querySelector('.menu-acb').classList.add('d-none')
    }

    return (
    <ul className='connectMenu d-flex'>
        <li onClick={handleClick} className='link'><NavLink to='/login'>Se connecter</NavLink></li>
        <li onClick={handleClick} className='link'><NavLink to='/register'>S'inscrire</NavLink></li>
    </ul>
    );
};

export default ConnectMenu;