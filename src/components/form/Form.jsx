import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/expenseSlice';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import './form.scss';

function Form() {
    const dispatch = useDispatch();
    const intermediateState = {
        item: '',
        amt: '',
        date: ''
    };

    const handleChange = (event, input) => {
        switch(input) {
            case 'item':
                intermediateState.item = event.target.value;
                break;
            case 'amt':
                intermediateState.amt = event.target.value;
                break;
            case 'date':
                intermediateState.date = event.target.value;
                break;
        }
    };

    const handleSubmit = () => {
        dispatch(addExpense(intermediateState));
        console.log(intermediateState);
    };

    return (
        <div className="form display-flex flex-column align-center justify-center">
            <div className='form-container'>
                <Input className="mb-3" name="item" label="Item Name" handleChange={handleChange} />
                <Input type="number" className="mb-3" name="amt" label="Amount" handleChange={handleChange} />
                <Input type="date" className="mb-3" name="date" handleChange={handleChange} />
                <div className='form-button-group'>
                    <Button className="primary" handleSubmit={handleSubmit}>
                        <i class="fa-solid fa-plus"></i>
                    </Button>
                    <Button className="secondary" handleSubmit={handleSubmit}>
                        <i class="fa-solid fa-xmark"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Form;