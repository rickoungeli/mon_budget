import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='text-center'>
            <h1 className='text-center'>Eih! Cette page n'existe pas</h1>
            <Link to='/' className='btn btn-primary mx-auto'>Retourner à l'accueil</Link>
            <div className='w-50 mx-auto'>
                <img 
                    src="https://st.depositphotos.com/1007989/4621/i/600/depositphotos_46211141-stock-photo-just-woke-up.jpg" 
                    alt="clipart" 
                    className='objet-fit'
                />

            </div>
            
        </div>
    );
};

export default NotFound;