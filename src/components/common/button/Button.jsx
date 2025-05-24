import './button.scss';

function Button(props) {
    return (
        <button className={'form-button ' + (props.className || '')} 
            onClick={() => props.handleSubmit()}
            onMouseDown={(e) => { e.target.classList.add('pressed') }}
            onMouseUp={(e) => { setTimeout(() => e.target.classList.remove('pressed'), 150); }} >
            {props.text || props.children || 'Submit'}
        </button>
    )
}

export default Button;