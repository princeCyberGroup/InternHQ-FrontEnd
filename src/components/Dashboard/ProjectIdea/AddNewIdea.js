import "./AddNewIdea.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const AddNewIdea = ({ projectDescript }) => {
    const [projName, setProjName] = useState("");
    const [projDescription, setProjDescription] = useState("");
    const [technologyNames, setTechnologyNames] = useState(null);
    const [memberNames, setMembers] = useState(null);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();
    // console.log("project", projectDescript);
    const [first, ...rest] = projectDescript;
    // console.log(projectDescript[0].projectNames, "This is 0th member");


    //code for dropdown
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionClick = (event) => {
        const { value } = event.currentTarget.dataset;
        const isChecked = event.currentTarget.querySelector('input').checked;

        if (isChecked) {
            const optionObject = { value };
            console.log(optionObject, "Valuesesars")
            setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, optionObject]);
        } else {
            setSelectedOptions((prevSelectedOptions) =>
                prevSelectedOptions.filter((option) => option.value !== value)
            );
        }
    };

    const [dropDown, setDropDown] = useState(false);
    //code for dropdown

    //get api
    const handleClick = (e) => {

        e.preventDefault();
        const data = { projectDescript }
        navigate('/project-idea-projects', { state: projectDescript });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://cg-interns-hq.azurewebsites.net/projectIdea", {
            projName,
            projDescription,
            userId,
            technologyNames,
            memberNames
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
        console.log("Laga diya")
    }
    return (
        <>
            <div className="card-body pb-0">
                <div className="text-row-1">

                    <p className="card-textt">
                        Simply share your project ideas with us, and our experts
                        will review it and provide feedback and guidance on how to
                        take it to the next level.
                    </p>
                </div>

                <div className="share-project">
                    <div className="d-flex align-item-center justify-content-between mb-2 ">
                        <div className="d-flex">
                            <p className="text mb-0 fw-bold">Shared Project Idea</p>
                        </div>

                        <button className="view-all fw-bold" onClick={(e) => {
                            handleClick(e)
                        }} >View All</button>
                    </div>
                </div>

                <div className="recipe-row">
                    <div className="recipe-text">
                        <h5 className="fw-bold">{first.projectNames}</h5>
                        <p className="fw-normal mb-1">
                            {first.projectText}
                        </p>
                        <div className="project-link-2">
                            <a href="http.reciperecommendationengine.github">
                                See More
                            </a>
                        </div>
                        <div className="members-div pt-0">
                            <div className="member mb pt-1 fw-bold mb-2">
                                Members:
                            </div>
                            <div className="project-members ml-0">
                                
                                {first.members.map((curElem, index) => {
                                    if(curElem != null){
                                    return (
                                      <div className="project-idea-members">
                                        <p className="name-of-members">
                                            {curElem.slice(0,2).toUpperCase()}
                                            </p>
                                        </div>   
                                    )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="add-new-idea pt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                >
                    <p className="project-p mb-0 mt-2 pb-2">
                        <span>+</span> Add New Idea
                    </p>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 add-project-wrapper" id="exampleModalLabel">
                                Add your Project Idea
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="project-name" className="col-form-label title-text">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="project-name"
                                        placeholder='Enter Project Name'
                                        onChange={(event) => setProjName(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        for="project-description"
                                        className="col-form-label title-text"
                                    >
                                        Project Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="project-description"
                                        placeholder='Write Here..'
                                        rows={3}

                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label for="technology-used" className="col-form-label title-text">
                                        Technology Used
                                    </label>
                                </div>

                                <div className="container border">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="button-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-default btn-sm dropdown-toggle"
                                                    onClick={() => {
                                                        setDropDown(!dropDown)
                                                    }}
                                                >

                                                </button>
                                                <ul style={{ display: dropDown ? "" : "none" }}>

                                                    <a
                                                        href="#"
                                                        className="text-decoration-none"
                                                        data-value="option1"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <input type="checkbox" />ReactJs
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="option2"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <input type="checkbox" />TypeScript
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="option3"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <input type="checkbox" />.Net
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="option4"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <input type="checkbox" />Angular
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="option5"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <input type="checkbox" />Python
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="option6"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <input type="checkbox" />NodeJS
                                                    </a>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="Members(Optional)" class="col-form-label title-text">
                                        Members(Optional)
                                    </label>
                                    <input
                                        class="form-control"
                                        id="project-description"
                                        placeholder="Member Name"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}