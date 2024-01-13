import React, { useEffect } from "react";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import SignInPage from './app/screens/auth/sign_in/sign_in.jsx';
import DashBoard from './app/screens/home_page/home_page.jsx';
import { useDispatch, useSelector } from "react-redux";
import RegisterPage from './app/screens/auth/sign_up/sign_up.jsx';
import { getRequestWithAuth } from "./app/utils/api_client.js";
import { getUserDetails } from "./app/store/user_slice.js";
import CreatePost from "./app/screens/create_post/create_post.jsx";
import BlogDetailsPage from "./app/screens/blog_details/blog_details_page.jsx";
import EditPost from "./app/screens/edit_page/edit_page.jsx";
import AdminDashBoard from "./app/screens/admin/admin_dashboard.jsx";

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = (userId) => {
    getRequestWithAuth(`/api/user/${userId}`).then((res) => {
      const user = {
        username: res.username,
        email: res.email,
        token: res.token,
        userId: res._id,
        role: res.role
      };
      dispatch(getUserDetails(user));
    });
  }

  return (
    <div className="App">
      <Routers>
        <Routes>
          <Route path="/auth/login" exact element={<SignInPage />} />
          <Route path="/auth/register" exact element={<RegisterPage />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path="/" exact element={<DashBoard />} />
          <Route path="/editPost/:id" exact element={<EditPost />} />
          <Route path="/blogs/:id" exact element={<BlogDetailsPage />} />
          <Route path="/adminDashboard" exact element={<AdminDashBoard />} />
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
