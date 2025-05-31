import Header from '../header/Header';
import Form from '../form/Form';
import Summary from '../summary/Summary';
import Spacer from '../../common/spacer/Spacer';
import { useDispatch } from 'react-redux';
import { setState } from '../../store/expenseSlice';
import { getInitialState } from '../../services/backendService';
import { useEffect } from 'react';
import setTestData from '../../test/data';
import './landing.scss';

function Landing() {
    const dispatch = useDispatch();

    const setInitialState = async () => {
        try {
            const data = await getInitialState();
            dispatch(setState(data));
            console.log('initial state', data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if(process.env.REACT_APP_ENV === 'test') {
            setTestData(dispatch, setState);
        } else {
            setInitialState();
        }
    }, []);

    return (
        <div className="landing">
            <Header />
            {/* <Spacer /> */}
            <Form />
            <Summary />
        </div>
    );
}

export default Landing;