import './input.scss';

function Input(props) {
    const handleFocus = (event) => {
        event.target.parentElement.classList.add('active');
    }

    const handleBlur = (event) => {
        if(event.target.value === '') {
            event.target.parentElement.classList.remove('active');
            event.target.classList.remove('touched');
        }
    }

    return (
        <div className={"form-group " + props.className}>
            <input type={props.type || 'text'} name={props.name} className='form-group_input' autoComplete='off'
                { ...props.noclear ? 'no-clear' : '' }
                onChange={e => props.handleChange(e, props.name)} 
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)} />
            {props.label && <span className="form-group_label">{props.label}</span>}
        </div>
    );
}

export default Input;