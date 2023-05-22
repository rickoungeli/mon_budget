import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Attention from '../../images/attention.png'
import { confirmAlert } from 'react-confirm-alert';

const Register = () => {
    const [alert, setAlert] = useState('')
    const [isRegistered, setIsRegistered] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        const navigate = useNavigate()
        setAlert('')
        const data1 = new FormData()
        data1.append('function', 'insertUserIntoBdd')
        data1.append('pseudo', data.pseudo)
        data1.append('password', data.password)
        axios.post(`${process.env.REACT_APP_API_URL}user.php`, data1)
        .then(res => {
            console.log(res)
            if(res.data==='') {
                setAlert("Echec : l'inscription n'a pas réussi")
            } else {
                if(res.data.includes('Vous avez été enregistré avec succès')){
                    //setAlert('Vous avez été enregistré avec succès')

                    //setTimeout(() => {
                    //    setAlert('')
                    if (YesNo("Votre inscription a réussi, vous devez vous connecter")){
                        navigate('/login')
                    }
                }           
                
            }
        })
        .catch(err => setAlert("Echec")) 

    
    }

    useEffect(() => { 
        document.title = "Inscription d'un utilisateur" 
    }, [])
    
    return (
        <div className='row no-gutters'>
            <form className='p-3 m-3 col-11 col-md-6 col-lg-4 mx-auto bg-info' onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mx-3 mt-3 text-center">S'inscrire</h1>
                <p className="text-center">Vous avez déjà un compte? <NavLink to="/login" className='link'>Se connecter</NavLink></p>
                                
                {alert && <p className='alert'>{alert}</p> }
                <div className='d-flex flex-column gap-3 mx-4'>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Pseudo" 
                            {...register('pseudo', { required: 'Veuillez entrer votre pseudo' })}
                            className = {errors.pseudo? "form-control border border-danger" : " form-control border border-success"}
                        />
                        {errors.pseudo && <span className="text-danger">{errors.pseudo.message}</span> }
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Mot de passe" 
                            {...register('password', { required: 'Veuillez entrer le mot de passe' })}
                            className = {errors.password? "form-control border border-danger" : "form-control border border-success"}
                        />
                        {errors.password && <span className="text-danger">{errors.password.message}</span> }
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirmer mot de passe" 
                            {...register('passwordConfirm', { required: 'Veuillez confirmer le mot de passe' })}
                            className = {errors.passwordConfirm? "form-control border border-danger" : "form-control border border-success"}
                        />
                        {errors.passwordConfirm && <span className="text-danger">{errors.passwordConfirm.message}</span> }
                    </div>
                                    
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary w-100" />
                        <small>En cliquant sur envoyer, vous acceptez nos <a href='www'>conditions générales</a> et notre politique des coockies</small>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Register;