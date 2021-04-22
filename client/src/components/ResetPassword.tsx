import { useState } from 'react';
import { RESETPASSWORD } from '../queries/auth.queries';
import { useMutation } from '@apollo/client';
import {logout} from '../store/authSlice';
import {useAppDispatch} from '../store/store.hook';

interface ResetPasswordProps {
    toggleModal : (state : boolean) => void;
}

const Modal : React.FC<ResetPasswordProps> = ({toggleModal}) => {
    const [loginData, setLoginData] = useState<Record<string, string>>();
    const [resetPassword,] = useMutation(RESETPASSWORD);
    const dispatch = useAppDispatch();

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData, [e.target.name]: e.target.value
        });
    };

    const loginHandler = async () => {
        try{

            let dataToPost = loginData as Object;
            if (!dataToPost || !dataToPost.hasOwnProperty("oldPassword")
            || !dataToPost.hasOwnProperty("newPassword")
            || !dataToPost.hasOwnProperty("confirmPassword")) {
                return alert("please all fields are required");
            }
            else {
                let postData = dataToPost as Record<string, string>;
                 await resetPassword({
                    variables: {
                        oldPassword: postData.oldPassword,
                        newPassword: postData.newPassword,
                        confirmPassword: postData.confirmPassword
                    }
                });
                dispatch(logout({}))
                toggleModal(false)
            }
        }catch(error){

        }
    };

    return (
        <div className="w3-modal">
            <div className="w3-modal-content">
                <div className="container">
                    <br /> <br />
                    <div className="form-container">
                        <div className="reset_container">
                            <h2>Reset Password</h2>
                            <input required name="oldPassword" onChange={handleLoginChange} type="password" className="form-control" placeholder="old password" />
                            <input required name="newPassword" onChange={handleLoginChange} type="password" className="form-control" placeholder="new password" />
                            <input required name="confirmPassword" onChange={handleLoginChange} type="password" className="form-control" placeholder="confirm password" />
                            <div className="btn_wrapper">
                                <button onClick={loginHandler} type="button" className="btn">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;