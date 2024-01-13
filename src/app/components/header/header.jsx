import React from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const onCreatePost = () => {
        navigate("/createPost");
    }

    const onLogout = () => {
        localStorage.clear();
        navigate("/auth/login");
    };

    const toDashboard = () => {
        if (token) {
            navigate("/adminDashboard");
        }
    }

    return (
        <nav class="navbar fixed-top navbar-light bg-light">
            <h1>Blog</h1>
            <div className='content'>
                {token && <button className="button" onClick={() => toDashboard()}>DASHBOARD</button>}
                <button className="button" onClick={() => token ? onCreatePost() : navigate("/auth/login")}>{token ? "Create Post" : "Login"}</button>
                {token && <button className="button" onClick={() => onLogout()}>LOGOUT</button>}
            </div>
        </nav>

    )
}


export default Header;