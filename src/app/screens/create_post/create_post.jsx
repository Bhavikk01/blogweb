import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create_post.css';
import { useSelector } from 'react-redux';
import { postRequest, postRequestWithAuth } from '../../utils/api_client.js';
const CreatePost = () => {

    const { user } = useSelector((state) => state.user);

    const [inputHandler, setInputHandler] = useState({
        title: '',
        description: ''
    });
    const navigate = useNavigate();

    const onChangeInputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        setInputHandler(() => {
            return { ...inputHandler, [name]: value };
        });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { title, description } = inputHandler;
        if (title === "") {
            alert("Please enter the title");

        } else if (description === "") {
            alert("Please fill the Description");
        }
        else {
            console.log(user);
            const data = await postRequestWithAuth("/api/addBlog", {
                title: title,
                description: description,
                userId: user.userId,
            });
            if (data) {
                setInputHandler({ ...inputHandler, title: " ", description: " " })
                navigate('/');
            }
        }
    };


    return (
        <section>
            {user.role !== "Viewer" && <div className="form_data">
                <div className="form_heading">
                    <h1>Create Post</h1>
                </div>

                <form>
                    <div className="form_input">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            onChange={onChangeInputHandler}
                            value={inputHandler.title}
                            id="title"
                            name="title"
                            placeholder="Title"
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="title">Description</label>
                        <input
                            type="text"
                            onChange={onChangeInputHandler}
                            value={inputHandler.description}
                            id="description"
                            name="description"
                            placeholder="Description"
                        />
                    </div>
                    <button className="btn" onClick={onSubmitHandler}>
                        Create Post
                    </button>
                </form>
            </div>}
        </section>
    )
}

export default CreatePost;