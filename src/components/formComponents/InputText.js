export function InputText({ id, label, type, name, value, onChange, className }) {
    return <div className="form-group d-flex flex-column mb-0">
        <label htmlFor={id} className='text-white me-2'>{label}</label>
        <input 
            type={type} 
            id={id}
            name = {name}
            value = {value}
            onChange={e => onChange(e.target.value)} 
            className={className}
        />
    </div>
}