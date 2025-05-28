import Header from '../header/Header';
import Form from '../form/Form';
import Summary from '../summary/Summary';
import Spacer from '../../common/spacer/Spacer';
import './landing.scss';

function Landing() {
    return (
        <div className="landing">
            <Header />
            <Spacer />
            <Form />
            <Summary />
        </div>
    );
}

export default Landing;