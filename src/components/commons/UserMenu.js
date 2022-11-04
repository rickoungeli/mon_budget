import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { logout } from '../../features/userReducer';

const UserMenu = () => {
    const dispatch = useDispatch()
    const handleClick = ()=> {
        document.querySelector('.menu-projet').classList.add('d-none')
        document.querySelector('.menu-acb').classList.add('d-none')
        dispatch(logout())
    }

    return (
        <NavLink to='/logout'><a href="#" onClick={handleClick} className="">
            <span className='d-flex flex-column align-items-center'><FaUser/>Deconnexion</span>
        </a></NavLink>
    );
};

export default UserMenu