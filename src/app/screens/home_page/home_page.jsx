import React, { useEffect } from "react";
import Post from '../../components/post_card/post_card.jsx';
import Header from '../../components/header/header.jsx';

import './home_page.css';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="post">
                <Post />
            </div>
        </div>
    );
}

export default Dashboard;
