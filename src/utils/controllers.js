
import React, { useState } from 'react';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import axios from 'axios';



//Fonction pour formater une date
export const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString('fr-Fr', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })
    return newDate
}

export const htmlEntities = (str) => {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
};


export const useCheckLibelle = (libelle) => {
    const [libelleMessage, setLibelleMessage] = useState('')
    if (!libelle) {
        setLibelleMessage("Le libelle est obligatoire");
        return true;
    } else if (libelle.length < 2 || libelle.length > 100) {
        setLibelleMessage("Veuillez taper un libelle valide svp");
        return true;
    } else {
        setLibelleMessage("");
        return false;
    }
};

