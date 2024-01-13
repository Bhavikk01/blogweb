import React, { useState, useEffect } from "react";
import "./edit_page.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/api_hook";
import axios from "axios";

const EditPost = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [inputHandler, setInputHandler] = useState({
        title: "",
        description: "",
    });

    const { data } = useFetch(`/api/getBlogById/${id}`);

    useEffect(() => {
        setInputHandler({
            title: data?.title,
            description: data?.description
        })
    }, [data]);

    const { user } = useSelector((state) => state.user);

    const onChangeInputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setInputHandler(() => {
            return { ...inputHandler, [name]: value };
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`http://localhost:5000/api/editBlog`, {
            id: id,
            title: inputHandler.title,
            description: inputHandler.description
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (data) {
            navigate("/");
        }
    };

    return (
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Edit Post</h1>
                </div>

                <form>
                    <div className="form_input">
                        <label htmlFor="title">title</label>
                        <input
                            type="text"
                            onChange={onChangeInputHandler}
                            id="title"
                            name="title"
                            value={inputHandler.title}
                            placeholder="Title"
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="title">Description</label>
                        <input
                            type="text"
                            onChange={onChangeInputHandler}
                            id="description"
                            name="description"
                            value={inputHandler.description}
                            placeholder="Description"
                        />
                    </div>
                    <button className="btn" onClick={onSubmitHandler}>
                        Edit Post
                    </button>

                </form>
            </div>
        </section>
    );
};

export default EditPost;
