export function Radio({ id, label, onChange, defaultChecked, value, name }) {
    return <div className="">
        <label htmlFor={id} key={id} className='form-check-label'> {libelle} </label>
        <input 
            id={id} 
            type="radio" 
            name={name}
            value={value} 
            className='form-check-input' 
            defaultChecked = {defaultChecked}
            onChange={(e)=> onChange(e.target.value)}
        />             
    </div>
}