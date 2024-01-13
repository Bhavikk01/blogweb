import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './sign_up.css';
import { postRequest } from '../../../utils/api_client.js';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [formValue, updateFormValue] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const handleSignUp = async () => {
        if (formValue.confirmPassword == formValue.password) {
            if (formValue.confirmPassword.length > 5) {
                const user = await postRequest('/api/auth/register', {
                    email: formValue.email,
                    password: formValue.confirmPassword,
                    role: formValue.role,
                    username: formValue.username
                });
                navigate('/auth/login');
            } else {
                // toast.error("Password should be greater than 5", {
                //     position: "bottom-right",
                //     autoClose: 8000,
                //     pauseOnHover: true,
                //     draggable: true,
                //     theme: "dark",
                // });
            }
        } else if (formValue.username.length < 3) {
            // toast.error("Username should be greater than 3", {
            //     position: "bottom-right",
            //     autoClose: 8000,
            //     pauseOnHover: true,
            //     draggable: true,
            //     theme: "dark",
            // });
        } else {
            // toast.error("Confirm password and password are not same", {
            //     position: "bottom-right",
            //     autoClose: 8000,
            //     pauseOnHover: true,
            //     draggable: true,
            //     theme: "dark",
            // });
        }
    };

    const updateFormField = (event) => {
        updateFormValue({ ...formValue, [event.target.name]: event.target.value })
    };

    return (
        <>
            <div className='register_card'>
                <form onSubmit={handleSignUp}>
                    <div className="register-text">
                        <span>Login to continue</span>
                    </div>

                    <input type="text"
                        name="username"
                        placeholder="Enter your name"
                        onChange={(e) => updateFormField(e)} />

                    <input type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => updateFormField(e)} />

                    <input type="password"
                        name='password'
                        placeholder='Enter your password'
                        onChange={(e) => updateFormField(e)} />

                    <input type="password"
                        name='confirmPassword'
                        placeholder='Enter confirm password'
                        onChange={(e) => updateFormField(e)} />

                    <input type="text"
                        name='role'
                        placeholder='Enter User Role'
                        onChange={(e) => updateFormField(e)} />

                    <button type='submit'>Register</button>
                    <span>Already have an account?  <Link to="/auth/login">Login</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default RegisterPage;
