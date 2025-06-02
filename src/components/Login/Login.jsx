import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { Tooltip } from "react-tooltip";
import { auth } from "../../global/API/api";
import { ToastContext } from "../../global/js/Contexts";
import "./login.scss";

function Login() {
    const { addToast } = useContext(ToastContext);
    const pwdValidation = useRef(null);
    const numberValidation = useRef(null);
    const [state, setState] = useState({ mobile:"", cred:""}); // TODO: Add validation for input fields
    const [errorState, setErrorState] = useState([false, false]); // TODO: Add error handling for invalid inputs
    const [isFirst, setIsFirst] = useState(false);
    const navigate = useNavigate();
    const disclaimer = "The password you enter here will be used for all future logins. Please remember it!";
    const phoneTooltipContent = `Please enter your registered mobile number again again.<br/>
    Again.`;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // const number = parseInt(e.nativeEvent.data);
        if (errorState[0] || state.mobile.length !== 10 || state.cred.length < 8) {
            return addToast('Invalid Details!');
        }
        
        if (isFirst) {
            // cred
            if (errorState[1] || state.cred.length < 8) {
                pwdValidation.current.classList.remove('display-none');
                return addToast('Password doesn\'t match the criteria!!');
            } else {
                setIsFirst(false);
            }
        }

        const res = await auth(state.mobile, state.cred, !errorState[1]);
        if(!res || res.message.indexOf('error') > -1) {
            setIsFirst(true);
            pwdValidation.current.classList.remove('display-none');
            return addToast('New User! Create Password!');
        } else {
            postAuth();
        }
    };
    
    const postAuth = () => {
        // set cookies and redirect to landing page.
        if(document.cookie.indexOf('sessionId') > -1) {
            setIsFirst(false);
            navigate('/landing');
        }
    }

    const handleChange = (e, name) => {
        switch(name) {
            case 'mobile':
                if(isNaN(parseInt(e.target.value))) {
                    e.target.value = '';
                } else {
                    e.target.value = parseInt(e.target.value);
                }
                setState({ ...state, mobile: e.target.value });
                break;
            case 'cred':
                setState({ ...state, cred: e.target.value });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }, []);

    useEffect(() => {
        const active = document.activeElement.name;
        const errorsParent = pwdValidation?.current.querySelector('.format');
        if(active === 'cred') {
            validatePwd(state.cred);
        } else if(active === 'mobile') {
            validateMob(state.mobile);
        }

        if(errorsParent.querySelectorAll('.valid').length === 5) {
            setErrorState([errorState[0], false]);
        }
        else {
            state.cred !== '' && setErrorState([errorState[0], true]);
        }
    }, [state]);

    useEffect(() => {
        const mobValidateClasses = numberValidation?.current.classList;
        const pwdValidateClasses = pwdValidation?.current.querySelector('.format').classList;
        errorState[0] ? mobValidateClasses?.add('show') : mobValidateClasses?.remove('show');
        errorState[1] ? pwdValidateClasses?.add('show') : pwdValidateClasses?.remove('dumdum');
    }, [errorState]);

    const validator = (selector, isValid) => {
        const el = pwdValidation.current.querySelector(`.${selector}`);
        if (isValid) {
            el.classList.add('valid');
        } else {
            el.classList.remove('valid');
        }
    }

    const validatePwd = (str) => {
        const conditions = {
            minLen: (str) => {
                validator('min-length', str.length >= 8);
            },
            oneUpper: (str) => {
                validator('uppercase', /[A-Z]/g.test(str));
            },
            oneLower: (str) => {
                validator('lowercase', /[a-z]/g.test(str));
            },
            oneNumber: (str) => {
                validator('numbers', /\d/g.test(str));
            },
            oneSpecial: (str) => {
                validator('special-characters', /[^a-zA-Z\d\s]/g.test(str));
            }
        };
        Object.keys(conditions).forEach(key => {
            conditions[key](str);
        });
    }

    const validateMob = (str) => {
        const mobno = parseInt(str);
        if(str && (isNaN(mobno) || mobno > 9999999999)) {
            setErrorState([true, errorState[1]]);
            console.log("Not a valid mobile number!");
        } else {
            setErrorState([false, errorState[1]]);
        }
    }

    return (
        <div className="login display-flex align-center">
            {/* <Link to="/landing">Login</Link> */}
            <div className="login-container">
                <div className="login-container-info">
                    <i className="fa-solid fa-circle-info"></i>
                    <p>Please sign in to get exclusive data!</p>
                </div>
                <div className="login-container-form">
                    <h2>Sign in</h2>
                    <h4>First time user? 
                        <span data-tooltip-id="login-disclaimer" data-tooltip-content={disclaimer}>Remeber this password!</span>
                        <Tooltip id="login-disclaimer" place="bottom" />
                    </h4>
                    <div className="login-form">

                        <div className="login-input-group">
                            <span className="tooltip-icon">
                                <i data-tooltip-id="phone-info" data-tooltip-html={phoneTooltipContent} className="fa-solid fa-circle-info"></i>
                                <Tooltip id="phone-info" place="left" />
                            </span>
                            <Input type="text" name="mobile" variant="plain" label="Mobile No." 
                                autocomplete="on" optional={{maxLength:"10", minLength:"10"}}
                                handleChange={handleChange} />
                            <div className="number-validation" ref={numberValidation}>
                                <i className="fa-solid fa-xmark"></i>
                                <span>Invalid Number</span>
                            </div>
                        </div>

                        <div className="login-input-group">
                            <span className="tooltip-icon">
                                <i data-tooltip-id="phone-info" data-tooltip-content={"abcd"} className="fa-solid fa-circle-info"></i>
                                <Tooltip id="phone-info" place="left" />
                            </span>
                            <Input type="password" name="cred" variant="plain" label="Password"
                                handleChange={handleChange} />
                            <div className="pwd-validation display-none" ref={pwdValidation}>
                                <div className="format">
                                    <div className="min-length">
                                        <i className="fa-solid fa-xmark"></i>
                                        <i className="fa-solid fa-check"></i>
                                        <span>Minimum length should be 8 characters.</span>
                                    </div>
                                    <div className="special-characters">
                                        <i className="fa-solid fa-xmark"></i>
                                        <i className="fa-solid fa-check"></i>
                                        <span>At least one special character.</span>
                                    </div>
                                    <div className="numbers">
                                        <i className="fa-solid fa-xmark"></i>
                                        <i className="fa-solid fa-check"></i>
                                        <span>At least one number.</span>
                                    </div>
                                    <div className="uppercase">
                                        <i className="fa-solid fa-xmark"></i>
                                        <i className="fa-solid fa-check"></i>
                                        <span>At least one uppercase letter.</span>
                                    </div>
                                    <div className="lowercase">
                                        <i className="fa-solid fa-xmark"></i>
                                        <i className="fa-solid fa-check"></i>
                                        <span>At least one lowercase letter.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="login-btn" text="Continue" handleClick={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;