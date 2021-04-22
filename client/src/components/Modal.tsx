import { useState } from 'react';
import { LoginType, RegistrationType } from '../types';
import { REGISTER, LOGIN } from '../queries/auth.queries';
import { useMutation } from '@apollo/client';
import {signInSuccess,registrationSuccess} from '../store/authSlice';
import {useAppDispatch} from '../store/store.hook';

const Modal = () => {
    const [registrationData, setRegistrationData] = useState<Record<string, string>>();
    const [loginData, setLoginData] = useState<Record<string, string>>();
    const [register, ] = useMutation(REGISTER);
    const [login,] = useMutation(LOGIN);
    const dispatch = useAppDispatch();

    const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({
            ...registrationData, [e.target.name]: e.target.value
        });
    };
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData, [e.target.name]: e.target.value
        });
    };

    const registerHandler = async () => {
        try {
            let dataToPost = registrationData as Object;
            if (!dataToPost ||
                !dataToPost.hasOwnProperty("email")
                || !dataToPost.hasOwnProperty("password") ||
                !dataToPost.hasOwnProperty("firstName")
                || !dataToPost.hasOwnProperty("lastName")) {
                return alert("please all fields are required");
            } else {
                let postData = dataToPost as RegistrationType;
                let result = await register({
                    variables: {
                        firstName: postData.firstName,
                        lastName: postData.lastName,
                        email: postData.email,
                        password: postData.password
                    }
                });

                if (result && result.data && result.data.register) {
                    localStorage.setItem("auth_detail", JSON.stringify(result.data.register));
                    dispatch(registrationSuccess(result.data.register));

                }
            }
        } catch (error) {
            alert("registration failed")
            console.log(error);
        }

    };
    const loginHandler = async () => {
        let dataToPost = loginData as Object;
        if (!dataToPost || !dataToPost.hasOwnProperty("email") || !dataToPost.hasOwnProperty("password")) {
            return alert("please all fields are required");
        }
        else {
            let postData = dataToPost as LoginType;
            let result = await login({
                variables: {
                    email: postData.email,
                    password: postData.password
                }
            });
            if (result && result.data && result.data.login) {
                localStorage.setItem("auth_detail", JSON.stringify(result.data.login));
                dispatch(signInSuccess(result.data.login));
            }
        }
    };

    return (
        <div className="w3-modal">
            <div className="w3-modal-content">
                <div className="container">
                    <br /> <br />
                    <div className="form-container">
                        <div className="Register">
                            <h2>Create new account</h2>
                            <input required name="firstName" onChange={handleRegistrationChange} type="text" className="form-control" placeholder="First name" />
                            <input required name="lastName" onChange={handleRegistrationChange} type="text" className="form-control" placeholder="Last name" />
                            <input required name="email" onChange={handleRegistrationChange} type="text" className="form-control" placeholder="Email" />
                            <input required name="password" onChange={handleRegistrationChange} type="password" className="form-control" placeholder="Password" />
                            <div className="btn_wrapper">
                                <button onClick={registerHandler} type="button" className="btn">Sign Up</button>
                            </div>

                        </div>
                        <div className="Login">
                            <h2>Login</h2>
                            <input required name="email" onChange={handleLoginChange} type="text" className="form-control" placeholder="Email" />
                            <input required name="password" onChange={handleLoginChange} type="password" className="form-control" placeholder="Password" />
                            <div className="btn_wrapper">
                                <button onClick={loginHandler} type="button" className="btn">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;