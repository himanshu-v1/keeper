import './button.scss';
/**
 * @param {*} props - text, handleClick
 * @abstraction - A button component that can be used for forms or other purposes.
 * - Types of Buttons:
 *  1. Primary: form-button primary
 *  2. Secondary: form-button secondary
 *  3. icon: icon only button
 *  4. disabled: form-button
 * @returns a button element with the given properties
 */
function Button(props) {
    const boundary = (e, callback) => {
        if (!callback) callback = () => {
            console.warn("No function passed to the button", props.text);
            return;
        }
        callback(e);
    };

    return (
        <button className={'form-button ' + (props.className || '')} 
            onClick={(e) => boundary(e, props.handleClick)}
            onMouseDown={(e) => { e.target.classList.add('pressed') }}
            onMouseUp={(e) => { setTimeout(() => e.target.classList.remove('pressed'), 150); }} >
            {props.text || props.children || 'Submit'}
        </button>
    )
}

export default Button;