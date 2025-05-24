import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/expenseSlice';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import './form.scss';
import { useRef, useContext } from 'react';
import initialState from '../../store/initialState';
import { clearForms } from '../common/utility/Utility';
import { ToastContext } from '../global/js/ToastContext';

function Form() {
    const { addToast } = useContext(ToastContext);
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    let intermediateState = structuredClone(initialState);

    const handleChange = (event, input) => {
        const value = event.target.value;
        
        switch(input) {
            case 'item':
                intermediateState.item = value;
                break;
            case 'amt':
                intermediateState.amt = value;
                break;
            case 'date':
                intermediateState.date = value;
                value ? event.target.classList.add('touched') : event.target.classList.remove('touched');
                break;
            default:
                break;
        }
        manageButtonState();
    };

    const handleSubmit = () => {
        if(!intermediateState.item && !intermediateState.amt) {
            addToast("Please enter item and amount");
            return;
        }

        if (!intermediateState.date) {
            intermediateState.date = new Date().toISOString().split('T')[0];
        }
        intermediateState.id = Math.floor(Math.random() * 100);
        dispatch(addExpense(intermediateState));
        console.log(intermediateState);
        intermediateState = structuredClone(initialState);
    };

    const handleCancel = () => {
        intermediateState = structuredClone(initialState);
        clearForms();
        manageButtonState();
    };

    function manageButtonState() {
        if(intermediateState.item || intermediateState.amt || intermediateState.date) {
            buttonRef.current.classList.add('dirty');
        } else {
            buttonRef.current.classList.remove('dirty');
        }
    }

    return (
        <div className="form display-flex flex-column align-center justify-center">
            <div className='form-container'>
                <Input className="mb-3" name="item" label="Item" handleChange={handleChange} />
                <Input type="number" className="mb-3" name="amt" label="Amount" handleChange={handleChange} />
                <Input type="date" className="mb-3" name="date" handleChange={handleChange} />
                <div className='form-button-group' ref={buttonRef}>
                    <Button className="primary" handleSubmit={handleSubmit}>
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                    <Button className="secondary" handleSubmit={handleCancel}>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Form;