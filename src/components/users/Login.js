import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from 'react-icons/ai';
import { BsKeyFill } from 'react-icons/bs';
import axios from "axios";
import Categories from "../../pages/Categories";
import Previsions from "../../pages/Page";


const Login = () => {
    //const dispatch = useDispatch()
    const [alert, setAlert] = useState("");
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(true);
    const errors = {
        pseudo: '', 
        password: ''
    }

    const page = localStorage.getItem('page')

    //Fonction pour récupérer et mettre en store la liste des catégories
    const getCategories = (userId) => {
        axios.get(`${process.env.REACT_APP_API_URL}categories.php?function=getCategories&userId=${userId}`)
        .then(res => {
            if(res.data=='') {
            setAlert("Vous devez enregistrer les categories d'opérations")
            setTimeout(()=>{
                localStorage.setItem('page','categories')
                window.location='/categories'
            },30000)
            } else {
                localStorage.setItem('categories', JSON.stringify(res.data))
                localStorage.setItem('page','previsions')
                window.location='/'
            }
            
        })
        .catch(err => setAlert("L'opération a echoué "+ err)) 
    }

    //Fonction pour récupérer et mettre en store la liste des operations
    const getTypesOperations = () => {
        axios.get(`${process.env.REACT_APP_API_URL}operations.php?function=getTypesOperations`)
        .then (res => {
            localStorage.setItem('typeOperations', JSON.stringify(res.data))
        })
        .catch(err => {
            setErrorMessage("Une erreur s'est produite" + err);
        })
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios.get(`${process.env.REACT_APP_API_URL}user.php?function=loginUser&pseudo=${pseudo}&password=${password}`)
            .then(res => {
                console.log(res);
                if(res.status != 200) {
                    setAlert("Un problème est survenu...")
                } else {
                    if (res.data.status == 404) {
                        setAlert("pseudo ou mot de passe incorrect")
                    } else {
                        //Mise en cache du user
                        localStorage.setItem('userId', res.data.id)
                        localStorage.setItem('userPseudo', res.data.pseudo)
                        localStorage.setItem('isConnected', 'true')

                        let date = new Date
                        let currentMonth = date.getMonth() + 1
                        let currentYear = date.getFullYear()
                        localStorage.setItem('savedMonth', currentMonth < 10 ? '0' + currentMonth : currentMonth)
                        localStorage.setItem('currentYear', currentYear)
                        localStorage.setItem('savedYear', currentYear)

                        //Récupération et mise en store de la liste des opérations
                        getTypesOperations()

                        //Récupération et mise en store de la liste des categories
                        getCategories(res.data.id)
                           
                    }

                }
            })
        } catch (error) {
            console.log(error);
            setAlert('Echec: connexion à la base de donnée impossible!')
        }
    }

    useEffect(() => { 
        document.title = "Connexion"
    }, [])
    
    return (
        <div className='row no-gutters'>
            {page == 'previsions'? <Previsions /> : (page == 'categories'? <Categories /> : 
            <form className='p-3 m-3 col-11 col-md-6 col-lg-4 mx-auto bg-info' onSubmit={handleSubmit}>
                <h1 className="mx-3 mt-3 text-center">Se connecter</h1>
                <p className="text-center">Vous avez déjà un compte? <NavLink to="/register" className='link'>S'inscrire</NavLink></p>
                                
                {alert=="La connexion a réussi"? <p className='alert alert-danger mx-4 py-2 text-center'>{alert}  <NavLink to="/previsions" className='btn btn-primary'>Continuer</NavLink></p> : alert && <p className='alert alert-danger mx-4 py-2 text-center'>{alert} </p> }
                
                <div className='d-flex flex-column gap-3 mx-4'>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Pseudo" 
                            value = {pseudo}
                            onChange = {(e) => setPseudo(e.target.value)}
                            className = {errors.pseudo? "form-control border border-danger" : " form-control border border-success"}
                        />
                        {errors.pseudo && <span className="text-danger">{errors.pseudo.message}</span> }
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Mot de passe" 
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            className = {errors.password? "form-control border border-danger" : "form-control border border-success"}
                        />
                        {errors.password && <span className="text-danger">{errors.password.message}</span> }
                    </div>
                                   
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary w-100" />
                        <small>En cliquant sur envoyer, vous acceptez nos <a href='www'>conditions générales</a> et notre politique des coockies</small>
                    </div>
                </div>
            </form>
            )}
        </div>
    );
};

export default Login;
