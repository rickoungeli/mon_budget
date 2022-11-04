import React from 'react';
import { useDispatch } from "react-redux";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SHOW_PREVISION_FORM } from '../../features/previsionReducer';

const Previsions_Navbar = () => {
    const dispatch = useDispatch();
    return (
        <nav className="nav-item dropdown me-2">
            <div className="btn text-center " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                <BiDotsVerticalRounded className="align-middle text-dark fs-2"/>
            </div>
            <ul className="dropdown-menu bg-dark">
                <li onClick={()=> dispatch(SHOW_PREVISION_FORM())} className="dropdown-item text-white btn"><i className="fa fa-paste"></i> Ajouter </li>
                <li ><hr className="dropdown-divider text-white p-0 m-0"/></li>
                <li onClick={()=> {}} className="dropdown-item text-white btn"><i className="fa fa-paste"></i> Modifier </li>
                <li ><hr className="dropdown-divider text-white  p-0 m-0"/></li>
                <li onClick={()=> {}} className="dropdown-item text-white btn"><i className="fa fa-trash-o"></i>  Supprimer </li>
            </ul>
        </nav>
    );
};

export default Previsions_Navbar;