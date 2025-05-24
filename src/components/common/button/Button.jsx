import './button.scss';

function Button(props) {
    return (
        <button className={'form-button ' + (props.className || '')} 
            onClick={() => props.handleSubmit()}
            onMouseDown={(e) => { e.target.classList.add('pressed')}}
            onMouseUp={(e) => { e.target.classList.remove('pressed')}} >
            {props.text || props.children || 'Submit'}
        </button>
    )
}

export default Button;