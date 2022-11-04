import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userReducer";
import { GrEdit } from 'react-icons/gr';
import { FiUserPlus } from 'react-icons/fi';

const Profil = (props) => {
    const user = useSelector(selectUser)
    const [passwordAlert, setPasswordAlert] = useState('')
    const [userInfosAlert, setUserInfosAlert] = useState('')
    const [success, setSuccess] = useState(false)
    const [picture, setPicture]= useState({
        url: "",
        file: null,
    })

    const [userInfos, setUserInfos] = useState({
        firstname: user.firstname,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
    })

    const [password, setPassword] = useState({
        old: "",
        new: "",
        confirm: "",
    })

    const [oldPwdMessage, setOldPwdMessage] = useState('')
    const [newPwdMessage, setNewPwdMessage] = useState('')
    const [newPwdMessage2, setNewPwdMessage2] = useState('')

    const [message, setMessage] = useState({
        firstname: "",
        name: "",
        email: "",
        country: "",
    })

    const [error, setError] =useState({
        infos: false,
        password: false
    })

    const [editUserInfos, setEditUserInfos] = useState(false)
    const [showPasswordForm, setShowPasswordForm] = useState(false)

    const updateUserInfos =(e) => {
        e.preventDefault()
        const checkResultArray=[]
        checkResultArray.push(props.checkName(userInfos.name))
        checkResultArray.push(props.checkFirstname(userInfos.firstname))
        checkResultArray.push(props.checkEmail(userInfos.email))
        //setEditUserInfos(false)

    }

    const updateUserPassword = (e) =>{
        e.preventDefault()
        const checkResultArray=[]
        checkResultArray.push(props.checkOldPassword(password.old))
        checkResultArray.push(props.checkPassword(password.new))
        checkResultArray.push(props.checkPasswordConfirm(password.new, password.confirm))
        
        if ( props.arrayCompare(checkResultArray, [false, false, false]) !== false) {
            setPasswordAlert('')
            const data = new FormData()
            data.append('function', 'editUserPassword')
            data.append('oldpwd', password.old)
            data.append('newpwd', password.new)
            data.append('iduser', user.id)
            data.append('email', user.email)

            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function(){              
                if (this.readyState == 4 && this.status == 200) {
                    if(this.response==='') {
                        setPasswordAlert("Echec : la modification du mot de passe n'a pas réussi")
                    } else {
                        if(this.response==='Le mot de passe a été modifié avec succès'){
                            setPasswordAlert(this.response)
                            setSuccess(true)
                            setPassword({
                                old: "",
                                new: "",
                                confirm: "",
                            })
                            setTimeout(() => {
                                setSuccess(false)
                                setPasswordAlert('')
                                setShowPasswordForm(false)
                            }, 3000);
                        }
                        
                        setPasswordAlert(this.response)
                    }
                    
                } 
                else if (this.readyState == 4 && this.status != 200) {
                    setPasswordAlert("Echec");
                }
                
            }
            xhr.open("POST", `${process.env.REACT_APP_API_URL}user.dao.php`, true)
            xhr.send(data)
            
        } else {
            setPasswordAlert('Il y a des erreurs')
        }  

    }
    
    const deleteUser =()=>{
        if(confirm("Etes-vous sûr de vouloir supprimer votre profil ?")){
            axios.delete(`users/${user.id}`)
            .then((res) => {
                console.log(res)
                //$store.dispatch('user', '')
                //$router.push('/')
            })
            .catch(err => console.log(err))
        }
    }

    const updateUserPicture =() => {
        const newPicture = new FormData()
        newPicture.append('image', picture.file, picture.file.name)
        newPicture.append('userId', user.id)
        axios.put(`users/${user.id}/updateUserPicture`, newPicture)
        .then(() => { 
            //gettingUser()
        })
        .catch (err => console.log(err))
    }

    useEffect(() => { 
        document.title = "Profil"
    }, [])
    
    function pictureSelected(e) {
        picture.file = e.target.files[0]
    }

    function showFileInput() {
        let fileInput = document.getElementById('file-input')
        fileInput.classList.toggle('d-none')
    }

   /*
    
    const gettingUser =() => {
        let userId = user.id
        console.log(userId);
        axios.get(`/users/${userId}`)
        .then((user) => $store.dispatch('user', user.data))
        .catch (err => console.log(err))
    }

    */
    return (
        <div className='main profil'>
            <h1>MON PROFIL</h1>
            <section className='section section-picture w-100'>
                <small className="title7">Cliquez sur la photo pour modifier</small>
                
                <div className="picture" onClick={showFileInput}>
                    
                    {/*user.picture.url && <p>Votre photo</p>*/}
                    {user.pictureurl ? <img src={user.pictureurl} className="w-100 rounded-circle"/> : <FiUserPlus className='w-75 h-75' mx-auto my-auto/> }
                    
                </div>
                
                <div className="d-flex d-none" id="file-input">
                    <input type="file" onChange={pictureSelected} />
                    <button onClick={updateUserPicture}>Télécharger</button>
                </div>
    
            </section>
            <hr/>
            <section className='section user-infos'>
                <p> Mes informations <GrEdit className="pencil ms-3" onClick={() => setEditUserInfos(true)}/></p>
                
                <div className="container">
                    {!editUserInfos && <div className="text-start w-100" id="infos">
                        <p className="w-100 mb-1"><span className="w-25"> Prénom : </span><span className="border-bottom w-75 perso-text-size">{user.firstname} </span></p> 
                        <p className="w-100 mb-1"><span className="w-25"> Nom : </span><span className="border-bottom w-75 perso-text-size">{user.name} </span></p>
                        <p className="w-100 mb-1"><span className="w-25"> Email : </span><span className="border-bottom w-75 perso-text-size">{user.email} </span></p>
                        <p className="w-100 mb-1"><span className="w-25"> Téléphone : </span><span className="border-bottom w-75 perso-text-size">{user.phone} </span></p>
                        <p className="w-100 mb-1"><span className="w-25"> Pays de résidence : </span><span className="border-bottom w-75 perso-text-size">{user.country} </span></p>
                    </div>}
                    
                    {editUserInfos && <form onSubmit={(e)=>updateUserInfos(e)} className=" text-start mx-auto" id="infos-1">
                        <div className="form-group mb-2 d-flex">
                            <label className="w-25"> Prénom : </label>
                            <div className="d-flex flex-column w-75">
                                <input 
                                    type="text"
                                    value={userInfos.firstname}
                                    className="form-control p-0 m-0 w-100" 
                                    onChange={(e) =>setUserInfos({...userInfos, firstname:props.htmlEntities(e.target.value)})} 
                                    style = {props.messageFirstname? props.borderRed : props.borderGreen}
                                /> 
                                <p className="title7 text-danger mb-0">{message.firstname}</p>
                            </div>
                        </div>
                        <div className="form-group mb-2 d-flex">
                            <label className="w-25"> Nom : </label>
                            <div className="d-flex flex-column w-75">
                                <input 
                                    type="text" 
                                    value={userInfos.name}
                                    className="form-control p-0 m-0 w-100" 
                                    onChange={(e) =>setUserInfos({...userInfos, name:props.htmlEntities(e.target.value)})} 
                                    style = {props.messageName? props.borderRed : props.borderGreen}
                                />
                                <p className="title7 text-danger mb-0">{message.name}</p>
                            </div>
                        </div>
                        <div className="form-group d-flex  mb-2">
                            <label className="w-25"> Email : </label>
                            <div className="d-flex flex-column w-75">
                                <input 
                                    type="text" 
                                    value={userInfos.email}
                                    className="form-control p-0 m-0 w-100" 
                                    onChange={(e) =>setUserInfos({...userInfos, email:props.htmlEntities(e.target.value)})} 
                                    style = {props.messageEmail? props.borderRed : props.borderGreen}
                                />
                                <p className="title7 text-danger mb-0">{message.email}</p>
                            </div>
                        </div>
                        <div className="form-group d-flex  mb-2">
                            <label className="w-25"> Téléphone : </label>
                            <div className="d-flex flex-column w-75">
                                <input 
                                    type="text" 
                                    value={userInfos.phone}
                                    className="form-control p-0 m-0 w-100" 
                                    onChange={(e) =>setUserInfos({...userInfos, phone:props.htmlEntities(e.target.value)})} 
                                    style = {props.messagePhone? props.borderRed : props.borderGreen}
                                />
                                <p className="title7 text-danger mb-0">{message.phone}</p>
                            </div>
                        </div>
                        <div className="form-group d-flex  mb-2">
                            <label className="w-25"> Pays de résidence : </label>
                            <div className="d-flex flex-column w-75">
                                <input 
                                    type="text" 
                                    value={userInfos.country}
                                    className="form-control p-0 m-0 w-100" 
                                    onChange={(e) =>setUserInfos({...userInfos, country:props.htmlEntities(e.target.value)})} 
                                    style = {props.messageCountry? props.borderRed : props.borderGreen}
                                />
                                <p className="title7 text-danger mb-0">{message.country}</p>
                            </div>
                        </div>
                        {userInfosAlert && <p className="alert alert-danger" >Il y a des erreurs, veuillez vérifier votre saisie</p>}
                        <input type="submit" value="Valider" className="btn btn-secondary w-25" />
                        <button className="btn btn-danger w-25" onClick={()=>setEditUserInfos(false)}>Annuler</button>
                    </form>}
                </div>
            </section>
            <hr/>
            <section className='section user-password'>
                <a onClick={()=>setShowPasswordForm(!showPasswordForm)} href="#"> Modifier mon mot de passe :  </a>
                {showPasswordForm && <form onSubmit={(e) => updateUserPassword(e)} className="text-start mx-auto">
                    <div className="form-group mb-2 d-flex">
                        <label className="w-25"> Ancien : </label>
                        <div className="d-flex flex-column w-75">
                            <input 
                                type="password" 
                                value={password.old}
                                onChange={(e) =>setPassword({...password, old:props.htmlEntities(e.target.value).trim()})} 
                                style = {props.messageOldPassword? props.borderRed : props.borderGreen}
                            /> 
                            <p className="title7 text-danger mb-0" id="message-oldpwd">{message.oldPwd}</p>
                        </div>
                    </div>
                    <div className="form-group mb-2 d-flex">
                        <label className="w-25"> Nouveau : </label>
                        <div className="d-flex flex-column w-75">
                            <input 
                                type="password" 
                                value={password.new}
                                onChange={(e) =>setPassword({...password, new:props.htmlEntities(e.target.value).trim()})} 
                                style = {props.messagePassword? props.borderRed : props.borderGreen}
                            />
                            <p className="title7 text-danger mb-0" id="message-newpwd-1">{newPwdMessage}</p>
                        </div>
                    </div>
                    <div className="form-group d-flex  mb-2">
                        <label className="w-25"> Confirmer : </label>
                        <div className="d-flex flex-column w-75">
                            <input 
                                type="password" 
                                value={password.confirm}
                                onChange={(e) =>setPassword({...password, confirm:props.htmlEntities(e.target.value).trim()})} 
                                style = {props.messagePasswordConfirm? props.borderRed : props.borderGreen}
                            />
                            <p className="title7 text-danger mb-0" id="message-newpwd-2">{newPwdMessage2}</p>
                        </div>
                    </div>
                    {passwordAlert && <p className={success? 'alert p-1 alert-success' : 'alert p-1 alert-danger'} >{passwordAlert}</p>}
                    <button className="btn btn-secondary w-25">Valider</button>
                </form>}
            </section>
            <hr/>
            <div onClick={()=>deleteUser()} className="btn btn-danger">Supprimer mon profil</div>
        </div>
    );
};

export default Profil;