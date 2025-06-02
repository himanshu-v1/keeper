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

    const handleLabelClick = () => {
        document.querySelector(`[name="${props.name}"]`).focus();
    }

    const boundary = (e, callback) => {
        if(!callback) return;
        callback(e, props.name);
    }

    return (
        <>
        {
            props.variant !== 'plain' ?
            (
                <div className={"form-group " + (props.className || '')}>
                    <input type={props.type || 'text'} name={props.name} className='form-group_input' 
                        autoComplete={props.autocomplete || 'off'}
                        { ...props.noclear ? 'no-clear' : '' }
                        onChange={e => boundary(e, props.handleChange)} 
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)} 
                        {...props.optional} />
                    {props.label && <span className="form-group_label" onClick={handleLabelClick}>{props.label}</span>}
                </div>
            ) :
            (
                <div className={"form-group-plain " + (props.className || '')}>
                    {props.label && <span className="form-group_label" label-for={props.name}>{props.label}</span>}
                    <input type={props.type || 'text'} name={props.name} className='form-group_input' 
                        autoComplete={props.autocomplete || 'off'}
                        { ...props.noclear ? 'no-clear' : '' }
                        onChange={e => boundary(e, props.handleChange)} 
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)}
                        {...props.optional} />
                </div>
            )
        }
        </>
    );
}

export default Input;