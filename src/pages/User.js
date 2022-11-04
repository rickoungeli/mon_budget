import React, { useState } from 'react';
import validator from "email-validator";
import Login from '../components/users/Login'
import Register from '../components/users/Register'
import Profil from "../components/users/Profil"
import GetPassword from '../components/users/GetPassword';

const User = (props) => {
    const [messageCode, setMessageCode] = useState("");
    const [messageName, setMessageName] = useState("");
    const [messageFirstname, setMessageFirstname] = useState("");
    const [messageEmail, setMessageEmail] = useState("");
    const [messageOldPassword, setMessageOldPassword] = useState("");
    const [messagePassword, setMessagePassword] = useState("");
    const [messagePasswordConfirm, setMessagePasswordConfirm] = useState("");
    const borderRed = { border: "1px solid red" };
    const borderGreen = { border: "1px solid Green" };
  
    const htmlEntities = (str) => {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    };
  
    const arrayCompare = (arrayA, arrayB) => {
      for (let i = 0; i < arrayA.length; i++) {
        if (arrayA[i] !== arrayB[i]) {
          return false;
        }
      }
    };
  
    const checkCode = (code) => {
      if (!code) {
        setMessageCode("Veuillez renseigner le code avant de vous inscrire");
        return true;
      } else if (code !== '1992') {
        setMessageCode("Le code n'est pas valide, veuillez réessayer !");
        return true;
      } else {
        setMessageCode("");
        return false;
      }
    };

    const checkName = (name) => {
      if (!name) {
        setMessageName("Le nom est obligatoire");
        return true;
      } else if (name.length < 2 || name.length > 100) {
        setMessageName("Veuillez taper un nom valide svp");
        return true;
      } else {
        setMessageName("");
        return false;
      }
    };
  
    const checkFirstname = (firstname) => {
      if (firstname.length < 2 || firstname.length > 100) {
        setMessageFirstname("Veuillez taper un prénom valide svp");
        return true;
      } else {
        setMessageFirstname("");
        return false;
      }
    };
  
    const checkEmail = (email) => {
      if (!email) {
        setMessageEmail("L'email ne peut pas être vide");
        return true;
      } else if (!validator.validate(email)) {
        setMessageEmail("L'email n'est pas correct");
        return true;
      } else {
        setMessageEmail("");
        return false;
      }
    };
  
    const checkOldPassword = (password) => {
      if (!password) {
        setMessageOldPassword("Veuillez saisir le mot de passe");
        return true;
      } else if (password.length < 3 || password.length > 30) {
        setMessageOldPassword(
          "Le mot de passe doit contenir entre 3 et 30 caractères"
        );
        return true;
      } else {
        setMessageOldPassword("");
        return false;
      }
    };

    const checkPassword = (password) => {
      if (!password) {
        setMessagePassword("Veuillez saisir le mot de passe");
        return true;
      } else if (password.length < 3 || password.length > 30) {
        setMessagePassword(
          "Le mot de passe doit contenir entre 3 et 30 caractères"
        );
        return true;
      } else {
        setMessagePassword("");
        return false;
      }
    };
  
    const checkPasswordConfirm = (password, passwordConfirm) => {
      if (!passwordConfirm) {
        setMessagePasswordConfirm("Veuillez confirmer le mot de passe");
        return true;
      } else if (password !== passwordConfirm) {
        setMessagePasswordConfirm("Les mots de passe ne correspondent pas");
        return true;
      } else {
        setMessagePasswordConfirm("");
        return false;
      }
    };

    return (
        <div className='main'>
         
            {props.login && <Login 
                messageEmail={messageEmail}
                messagePassword={messagePassword}
                htmlEntities={htmlEntities}
                checkEmail={checkEmail}
                checkPassword={checkPassword}
                borderRed={borderRed}
                borderGreen={borderGreen}
                arrayCompare={arrayCompare}
            /> }
            {props.register && <Register 
                messageCode={messageCode}
                messageName={messageName}
                messageFirstname={messageFirstname}
                messageEmail={messageEmail}
                messagePassword={messagePassword}
                messagePasswordConfirm={messagePasswordConfirm}
                htmlEntities={htmlEntities}
                checkCode={checkCode}
                checkName={checkName}
                checkFirstname={checkFirstname}
                checkEmail={checkEmail}
                checkPassword={checkPassword}
                checkPasswordConfirm={checkPasswordConfirm}
                borderRed={borderRed}
                borderGreen={borderGreen}
                arrayCompare={arrayCompare}
            /> }
            {props.profil && <Profil 
              messageName={messageName}
              messageFirstname={messageFirstname}
              messageEmail={messageEmail}
              messageOldPassword={messageOldPassword}
              messagePassword={messagePassword}
              messagePasswordConfirm={messagePasswordConfirm}
              htmlEntities={htmlEntities}
              checkName={checkName}
              checkFirstname={checkFirstname}
              checkEmail={checkEmail}
              checkOldPassword={checkOldPassword}
              checkPassword={checkPassword}
              checkPasswordConfirm={checkPasswordConfirm}
              borderRed={borderRed}
              borderGreen={borderGreen}
              arrayCompare={arrayCompare}
            /> }
            {props.password_forget && <GetPassword 
              checkEmail={checkEmail}
              messageEmail={messageEmail}
              borderRed={borderRed}
              borderGreen={borderGreen}
            /> }
        </div>
    );
};

export default User;