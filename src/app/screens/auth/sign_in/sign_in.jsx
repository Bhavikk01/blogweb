import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './sign_in.css';
import { postRequest } from '../../../utils/api_client';
import { useSelector } from 'react-redux';

const SignInPage = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [formValue, updateFormValue] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/");
        }
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (formValue.password.length > 5) {
            const user = await postRequest('/api/auth/login', {
                email: formValue.email,
                password: formValue.password
            });
            localStorage.setItem("user_id", user._id);
            localStorage.setItem("token", user.token);
            navigate('/');
        } else {
            // toast.error("Password should be greater than 5", {
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
            <div className='login_card'>
                <form onSubmit={handleSignIn}>
                    <div className="login-text">
                        <span>Login to continue</span>
                    </div>
                    <input type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => updateFormField(e)} />

                    <input type="password"
                        name='password'
                        placeholder='Enter your password'
                        onChange={(e) => updateFormField(e)} />

                    <button type='submit'>LOGIN</button>
                    <span>Don't have an account?  <Link to="/auth/register">Create one</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default SignInPage;
