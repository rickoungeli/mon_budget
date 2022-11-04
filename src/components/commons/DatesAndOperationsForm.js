import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectDateTo, selectMonth } from "../../features/operationsReducer";
import { DATES, SELECTED_OPS, LOAD_OPERATIONS } from '../../features/operationsReducer';

const DatesAndOperationsForm = () => {
    const dispatch = useDispatch();
    const fmonth = useSelector(selectMonth); //Liste des mois
    const operations = JSON.parse(localStorage.getItem('operations')); //Liste des opérations
    const todaysdate = (new Date().toLocaleDateString()).split('/');  //Date du jour

    const [selectedMonth, setSelectedMonth] = useState(todaysdate[1]);
    const [selectedYear, setSelectedYear] = useState(todaysdate[2]);
    const [selectedOperation, setSelectedOperation] = useState('D');

    //Fonction pour trouver le nombre de jours du mois
    const getDaysNumber = (monthGived) => {
        const day = fmonth.filter(item => item.id.includes(monthGived))
        return day[0].lastday
    }
    
    const[dateFrom, setDateFrom] = useState(todaysdate[2]+'-'+todaysdate[1]+'-'+'01'); //Premier jour du mois
    const[dateTo, setDateTo] = useState(todaysdate[2]+'-'+todaysdate[1]+'-'+getDaysNumber(selectedMonth)) //Dernier jour du mois
    useEffect(()=>{
        dispatch(DATES({
            dateFrom: todaysdate[2]+'-'+todaysdate[1]+'-'+'01',
            dateTo: todaysdate[2]+'-'+todaysdate[1]+'-'+getDaysNumber(selectedMonth)
        }))

    }, [])
    //Comportements   
    const onMonthClicked = e => {
            setSelectedMonth(e.target.value)
            setDateFrom(selectedYear+'-'+e.target.value+'-'+'01');
            setDateTo(selectedYear+'-'+e.target.value+'-'+getDaysNumber(e.target.value));
            dispatch(DATES({
                dateFrom: selectedYear+'-'+e.target.value+'-'+'01',
                dateTo: selectedYear+'-'+e.target.value+'-'+getDaysNumber(e.target.value)
            }))
            dispatch(LOAD_OPERATIONS(true))
    }
   const onYearClicked = e => {
        setSelectedYear(e.target.value)
        setSelectedMonth('01')
        setDateFrom(e.target.value+'-'+'01'+'-'+'01');
        setDateTo(e.target.value+'-'+'01'+'-'+'31');
        dispatch(DATES({
            dateFrom: e.target.value+'-'+'01'+'-'+'01',
            dateTo: e.target.value+'-'+'01'+'-'+'31'
        }))
        dispatch(LOAD_OPERATIONS(true))
    }

    const onOperationClicked = e => {
        setSelectedOperation(e.target.value)
        dispatch(SELECTED_OPS(e.target.value))

    }

    const onDateFromClicked = (date1) => {
        setDateFrom(date1)
        dispatch(DATES({
            dateFrom: date1,
            dateTo: dateTo
        }))
    }

    const onDateToClicked = (date2) => {
        setDateTo(date2)
        dispatch(DATES({
            dateFrom: dateFrom,
            dateTo: date2
        }))
    }
   
    return (
        <form className='dates-form col-12 col-md-10 col-lg-8 rounded-2 bg-success text-light p-1'>
            <div className='d-flex'>
                {/* Groupe choix opération */}
                <div className='groupe-type-operation d-flex flex-column col-4 p-2'>
                    <p className='mb-0'>Types d'opérations :</p>
                    {operations.map((operation) => (
                        <label htmlFor={operation.id} key={operation.id} className='form-check-label'>
                            <input 
                                type="radio" 
                                id={operation.id} 
                                name='selectedOperation'
                                value={operation.id} 
                                className='form-check-input' 
                                defaultChecked = {(operation.id == 'D') && 'checked'}
                                onChange={(e)=> onOperationClicked(e)}
                            />
                            {operation.libelle}
                        </label> 
                    ))}  
                </div>
                
                <div className="form-group d-flex flex-column flex-lg-row col-8">
                    <div className="groupe-mois-annee d-flex mb-2 col-lg-6 gap-2 mb-2">
                        {/* Groupe mois */}
                        <div className="groupe-mois d-flex flex-column">
                            <label htmlFor="month">Mois :</label>
                            <select 
                                id="month" 
                                name='selectedMonth' 
                                className="rounded" 
                                //defaultValue={todaysdate[1]}
                                value={selectedMonth}
                                onChange={(e)=> onMonthClicked(e)}>
                                {fmonth.map((month) => (
                                    <option value={month.id} key={month.id} >{month.libelle} </option>
                                ))}   
                                                        
                            </select>
                        </div>
                        {/* Groupe année */}
                        <div className="groupe-annee d-flex flex-column">
                            <label htmlFor="selectedYear">Année :</label>
                            <select 
                                id='selectedYear' 
                                name='selectedYear'
                                className=''
                                value={selectedYear}
                                onChange={(e)=>onYearClicked(e)}>
                                {(()=>{
                                    let listbox = [];
                                    for(let i=2020; i<=(parseInt(todaysdate[2])+10); i++){ 
                                        listbox.push(<option value={i} key={i} >{i}</option>)
                                    }
                                    return listbox ;
                                })()}

                            </select>
                        </div>
                    </div>
                    
                    <div className="groupe-du-au d-flex gap-2 mb-2">
                        {/* Groupe date de début */}
                        <div className="groupe-date-debut d-flex flex-column">
                            <label htmlFor="date-debut">Du :</label>
                            <input 
                                type="date" 
                                id='date-debut' 
                                name='dateFrom'
                                value={dateFrom}
                                onChange = {(e) => onDateFromClicked(e.target.value)}
                            />
                        </div>
                        {/* Groupe date fin */}
                        <div className="groupe-date-fin d-flex flex-column">
                            <label htmlFor="date-fin">Au :</label>
                            <input 
                                type="date" 
                                id="date-fin" 
                                name='dateTo'
                                value={dateTo}
                                onChange = {e => onDateToClicked(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default DatesAndOperationsForm;