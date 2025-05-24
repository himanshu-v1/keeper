import './button.scss';
/**
 * @param {*} props - text, handleSubmit
 * @abstraction - A button component that can be used for forms or other purposes.
 * - Types of Buttons:
 *  1. Primary: form-button primary
 *  2. Secondary: form-button secondary
 *  3. icon: icon only button
 */
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