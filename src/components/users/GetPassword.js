import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { NavLink } from 'react-router-dom';
import { FcApproval } from 'react-icons/fc';
import axios from 'axios';

const GetPassword = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [alert1, setAlert1] = useState('')
    const [messageEmailSent, setMessageEmailSent] = useState(false)
    let ctrl = 0

    const handleSubmit = e => {
        e.preventDefault()
        if (!props.checkEmail(email)){
            //création et enregistrement du mot de passe provisoire
            let pass = Math.round(Math.random() * 546892)
            setPassword(pass)
            const data = new FormData()
            data.append('function', 'putProvisoirePassword')
            data.append('email', email) 
            data.append('password', pass)

            axios.post(`${process.env.REACT_APP_API_URL}user.dao.php`, data)
            .then(res => {
                if(res.data=='') {
                    setAlert("Echec")
                } else if(res.data=='succès') {
                    //envoie d'email
                    const templateParams = {
                        name: 'Gmail',
                        password: pass,
                        adress: email
                    };

                    emailjs.send('service_cf04zl2','template_oy1mmap', templateParams, '0JE7UzJnc76mjtyOz')
                    .then((response) => {
                        setMessageEmailSent(true)
                    }, (err) => {
                        setAlert("L'envoi d'email a échoué, nous corrigeons le problème")
                    });  
                } else {
                    setAlert(res.data)
                }
            })
            .catch(err => setAlert('Echec'))
        }
    }

    const handleVerif = e => {
        setEmail(e.target.value)
        props.checkEmail(e.target.value)
    }

    return (
        <main className="container col-lg-8 bg-white rounded-2 perso-main" style={{minHeight: 500}}>

            <div className="row no-gutters w-100">
                {!messageEmailSent && <form onSubmit={(e)=>handleSubmit(e)} className="form col-12 col-md-8 col-lg-6  mx-auto bg-white shadow-sm p-3 rounded border border-secondary mt-1">
                    <div className="d-flex bg-dark text-white p-2 rounded-top text-center mx-auto mb-2">
                        <h3 className="text-white text-center mt-2">MOT DE PASSE OUBLIE</h3>
                    </div>
                    {alert !== "" && <div className='alert alert-danger my-0' role='alert'>{alert}</div> }
                    {alert1 !== "" && (
                        <div className='alert alert-success my-0' role='alert'>
                            <p className='fw-bold mb-1'>{alert1}</p>
                            <p>Vous allez recevoir un lien de réinitialisation de votre mot de passe par courriel. Cela peut prendre quelques minutes.</p>
                        </div>)}

                    {ctrl === 0 &&  <p className='mr-2 my-3 text-center'>Pour réinitialiser votre mot de passe, veuillez taper l’adresse électronique associé à votre compte </p>}
                    
                    <div className="form-group mb-2 mt-2 d-flex">
                        <label className="w-25">Email</label>
                        <div className="d-flex flex-column w-75">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Veuiller taper l'email" 
                                value={email} 
                                onChange={(e)=>handleVerif(e)}
                                style={props.messageEmail ? props.borderRed : props.borderGreen}
                            />
                            {props.messageEmail && <p className="title7 text-danger mb-0">{props.messageEmail}</p>}
                        </div>
                    </div>

                    <hr className="mb-1"/>

                    <div className="row no-gutters">
                        <input 
                            type="submit" 
                            value="Envoyer" 
                            className="btn btn-primary btn-block col-11 mx-auto border-rounded"/>
                    </div>

                </form>}
                {messageEmailSent && <div className=''>
                    <p className='alert alert-success w-100 mt-5 text-center'><FcApproval style={{fontSize:50}}/><br /> Un email contenant un mot de passe provisoire vous a été envoyé, vous allez le recevoir dans un instant. <br/>Vous pourrez modifier ce mot de passe dans votre profil</p>
                    <p className="alert alert-danger d-none">Attention cette fonctionnalité n'est pas encore opérationnelle !!</p>
                </div>}
                
            </div>
        </main>
    );
};

export default GetPassword;