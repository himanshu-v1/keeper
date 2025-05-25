import { useDispatch } from 'react-redux';
import { addExpense, editExpense } from '../../store/expenseSlice';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import './form.scss';
import { useRef, useContext, useState, useEffect } from 'react';
import initialState from '../../store/initialState';
import { clearForms } from '../common/utility/Utility';
import { ToastContext, EditContext } from '../global/js/Contexts';

function Form() {
    const { addToast } = useContext(ToastContext);
    const editContext = useContext(EditContext);
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    let intermediateData = structuredClone(initialState);
    const [data, setData] = useState(initialState);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        prepareForm(editContext.edit);
    }, [editContext]);

    const handleChange = (event, input) => {
        const value = event.target.value;
        
        switch(input) {
            case 'item':
                intermediateData.item = value;
                break;
            case 'amt':
                intermediateData.amt = value;
                break;
            case 'date':
                intermediateData.date = value;
                value ? event.target.classList.add('touched') : event.target.classList.remove('touched');
                break;
            default:
                break;
        }
        manageButtonState();
    };

    useEffect(() => {
        updateStore();
    }, [data]);

    const handleSubmit = () => {
        if(!intermediateData.item && !intermediateData.amt) {
            addToast("Please enter item and amount");
            return;
        }

        if (!intermediateData.date) {
            intermediateData.date = new Date().toISOString().split('T')[0];
        }
        intermediateData.id = intermediateData.id || Math.random().toString(16).slice(2);
        setData({ ...data, ...intermediateData });
    };

    const updateStore  = () => {
        if(!data.item && !data.amt) {
            return;
        }
        if(!editMode) {
            dispatch(addExpense(data));
            addToast("Added!!");
        }
        else {
            dispatch(editExpense(data));
            setEditMode(false);
            editContext.setEditData({});
            addToast("Updated!!");
        }
        handleCancel();
    };

    const handleCancel = () => {
        setData(initialState);
        clearForms();
        manageButtonState();
    };

    function manageButtonState() {
        if(intermediateData.item || intermediateData.amt || intermediateData.date) {
            buttonRef.current.classList.add('dirty');
        } else {
            buttonRef.current.classList.remove('dirty');
        }
    }

    const prepareForm = (data) => {
        if(data.id) {
            const itemEl = document.querySelector('[name="item"]');
            const amtEl = document.querySelector('[name="amt"]');
            const dateEl = document.querySelector('[name="date"]');
            intermediateData = structuredClone(data);
            console.log(intermediateData);
            itemEl.value = data.item;
            itemEl.focus();
            amtEl.value = data.amt;
            amtEl.focus();
            dateEl.value = data.date;
            dateEl.classList.add('touched');
            buttonRef.current.classList.add('dirty');
            setEditMode(true);
        }
    };

    return (
        <div className="form display-flex flex-column align-center justify-center">
            <div className='form-container'>
                <Input className="mb-3" name="item" label="Item" handleChange={handleChange} />
                <Input type="number" className="mb-3" name="amt" label="Amount" handleChange={handleChange} />
                <Input type="date" className="mb-3" name="date" handleChange={handleChange} />
                <div className='form-button-group' ref={buttonRef}>
                    <Button className="primary" handleClick={handleSubmit}>
                        <i className={`fa-solid ${!editMode ? "fa-plus" : "fa-check"}`}></i>
                    </Button>
                    <Button className="secondary" handleClick={handleCancel}>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Form;