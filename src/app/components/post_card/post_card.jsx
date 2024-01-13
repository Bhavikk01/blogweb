import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./post_card.css";
import { useFetch, useFetchAuth } from "../../hooks/api_hook";
import { useSelector } from "react-redux";
import axios from "axios";

const Post = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    let { data, setData } = useFetch("/api/getAllBlog");


    const handleBlogClick = (event, id) => {
        event.preventDefault();
        navigate(`/blogs/${id}`);
    };

    const deleteHandler = async (event, id) => {
        event.preventDefault();
        const res = await axios.get(`http://localhost:5000/api/blog/delete/${id}`);
        if (res.data.data.acknowledged) {
            let temp = data.filter((blog) => blog._id !== id);
            setData(temp);
            console.log(data);
        }
    };

    return (
        <div className="mx-auto mt-4 ">
            <div className="row">
                {data && data?.map((blog) => (
                    <div className="col-md-4 card-container" key={blog._id} >
                        <div
                            className="card content "
                            style={{ width: "25rem", marginTop: "1rem" }}>

                            <div className="card-body text-center ">
                                <h5 className="card-title " onClick={(e) => handleBlogClick(e, blog._id)}>{blog.title}</h5>
                                <p className="card-text" onClick={(e) => handleBlogClick(e, blog._id)}>{blog.description}</p>
                                <div className="btn-container">
                                    {user?.role && (user?.role.role !== "Viewer" || user?.userId == blog.userId) && (< Link className="btn" to={`/editPost/${blog._id}`}>
                                        Edit
                                    </Link>)}
                                    {user?.role && (user?.role.role !== "Viewer" || user?.userId == blog.userId) && (<button
                                        className="btn"
                                        onClick={(e) => deleteHandler(e, blog._id)}>
                                        Delete
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Post;
