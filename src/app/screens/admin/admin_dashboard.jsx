import React, { useEffect, useState } from "react";
import "./admin_dashboard.css";
import Header from "../../components/header/header";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const { user } = useSelector((state) => state.user);
    const [userData, setUserData] = useState(undefined);
    const [blogData, setBlogData] = useState(undefined);


    const onBlogHandler = (e) => {
        e.preventDefault();
        setValue(1);
    };

    const onUserHandler = (e) => {
        e.preventDefault();
        setValue(0);
    };

    const fetchUserData = async () => {
        console.log(user);
        const { data } = await axios.get(`http://localhost:5000/api/getAllUser/${user.userId}`);
        setUserData(data.data);
    };

    const fetchBlogData = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/getAllBlog`);
        setBlogData(data.data);
    };
    const handleUserChange = async (userId) => {
        try {
            const response = await axios.delete('http://localhost:5000/api/deleteUser/' + userId);
            if (response.status === 200) {
                console.log("handleUserChangeTriggered");
            }
        } catch (error) {
            console.error("Failed to delete user: ", error);
        }
    };

    useEffect(() => {
        if (user.role.role === "Admin") {

            if (user.userId) {
                if (value == 0) {
                    fetchUserData();
                } else if (value == 1) {
                    fetchBlogData();
                }
            }
        }
        else {
            navigate("/getAllBlogs");
        }
    }, [user, value]);

    return (
        <div>
            <Header />
            <div className="div"></div>
            <div>
                <button onClick={(e) => onUserHandler(e)} >User</button>
                <button onClick={(e) => onBlogHandler(e)}>Blog</button>
            </div>
            <div>
                {value === 0 &&
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" >UserName</th>
                                <th scope="col">email </th>
                                <th scope="col">Role</th>
                                <th scope="col">Edit</th>
                                <th scope="col">delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData && userData?.map((user) => (<tr>
                                <th scope="row">
                                    <span>{user.username}</span></th>
                                <td>
                                    <span>{user.email}</span>
                                </td>
                                <td>
                                    <select>
                                        <option value="edit">Admin</option>
                                        <option value="delete">Editor</option>
                                        <option value="delete">Viewer</option>
                                    </select>
                                </td>
                                <td>
                                    {" "}
                                    <th scope="col">
                                        <button>Edit</button>
                                    </th>
                                </td>
                                <td>
                                    {" "}
                                    <th scope="col">
                                        <button onClick={() => handleUserChange(user._id)}>Delete</button>
                                    </th>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                }
            </div>
            {value === 1 &&
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">UserName</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Edit</th>
                                <th scope="col">delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogData && blogData?.map((blog) => (<tr>
                                <th scope="row"> <span>{blog.userId}</span></th>
                                <td> <span>{blog.title}</span></td>
                                <td>
                                    <span>{blog.description}</span>
                                </td>
                                <td>
                                    {" "}
                                    <th scope="col">
                                        <button>Edit</button>
                                    </th>
                                </td>
                                <td>
                                    {" "}
                                    <th scope="col">
                                        <button >Delete</button>
                                    </th>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default Admin;