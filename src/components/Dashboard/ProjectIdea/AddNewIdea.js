import "./AddNewIdea.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const AddNewIdea = ({ projectDescript }) => {
    const navigate = useNavigate();
    const [first,...rest] = projectDescript;
    console.log(first, "This is projectDescript")
    const [projName, setProjName] = useState("");
    const [projDescription, setProjDescription] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [technologyNames, setTechnologyNames] = useState([]);
    const [userId, setUserId] = useState("1");
    const [counter, setCounter] = useState(1);
    const [textInput, setTextInput] = useState('');
    const [memberNames, setMemberNames] = useState({});
    const [techNames, seTechNames] = useState({});
    const [dropDown, setDropDown] = useState(false);


    const truncate = (str, maxLength) => {
        if (str.length > maxLength) return (str.slice(0, maxLength) + "...");
        else return str;
    }

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    let dataArr = {
    }
    const handleOptionClick = (event) => {
        const { value } = event.currentTarget.dataset;
        const isChecked = event.currentTarget.querySelector('input').checked;

        if (isChecked) {

            var optionObject = `tech${counter}`;
            technologyNames.push(value)
            console.log("Name:", technologyNames);
            console.log(dataArr, "Valuesesars")
            setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, optionObject]);
            setCounter((prevCounter) => prevCounter + 1);
        } else {
            setSelectedOptions((prevSelectedOptions) =>
                prevSelectedOptions.filter((option) => Object.values(option)[0] !== value)
            );
        }
    };

    const handleClick = (e) => {

        e.preventDefault();
        const data = { projectDescript }
        navigate('/project-idea-projects', { state: projectDescript });
    }

    const handleSubmit = (e) => {
        if (projName.trim() === '') {
            alert('Project Name is required');
            return;
          }
        
        e.preventDefault();
        axios.post("https://cg-interns-hq.azurewebsites.net/projectIdea", {
            projName,
            projDescription,
            userId,
            technologyNames: techNames,
            memberNames
        }).then((res) => {
            console.log("print", res.data);
        }).catch((err) => {
            console.log(err);
        })
        setTextInput('');
        setProjName("");
        setProjDescription("");
        
    }

    useEffect(() => {
        const texts = textInput.split(',').map((text) => text.trim());
        const textObj = {};
        texts.forEach((text, index) => {
            textObj[`member${index + 1}`] = text;
        });


        technologyNames.forEach((curElem, index) => {
            techNames[`tech${index + 1}`] = curElem
        })

        setMemberNames(textObj);
    }, [textInput]);

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
                            {first.projectText.length > 100 ? truncate(first.projectText, 100) : first.projectText}
                        </p>
                        <div className="members-div pt-0">
                            <div className="member mb pt-1 fw-bold mb-2">
                                Members:
                            </div>
                            <div className="project-members ml-0">
                                {first.members.length > 4 ? (
                                    first.members.map((curElem, index) => {
                                        if (curElem != null) {
                                            return (
                                                <div className="project-idea-members" key={index}>
                                                    <p className="name-of-members">{curElem.slice(0, 2).toUpperCase()}</p>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <div className="project-idea-members">
                                        <p className="name-of-members">+ {first.members.length}</p>
                                    </div>
                                )}
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
                    <p className="project-p mb-0 mt-2 pb-2 fw-bold">
                        <span>+</span> Add New Idea
                    </p>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
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
                                    <label htmlFor="project-name" className="col-form-label title-text">
                                       Project Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={projName}
                                        id="project-name"
                                        placeholder='Enter Project Name'
                                        onChange={(event) => setProjName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="project-description"
                                        className="col-form-label title-text"
                                    >
                                        Project Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        value={projDescription}
                                        id="project-description"
                                        placeholder='Write Here..'
                                        onChange={(event) => setProjDescription(event.target.value)}
                                        rows={3}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="technology-used" className="col-form-label title-text">
                                        Technology Used
                                    </label>
                                </div>

                                <div className="container border">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="button-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-default btn-sm dropdown-toggle drop-down-technology"
                                                    onClick={() => {
                                                        setDropDown(!dropDown)
                                                    }}
                                                >
                                                </button>

                                                <ul style={{ display: dropDown ? "" : "none" }}>

                                                    <a
                                                        href="#"
                                                        className="text-decoration-none"
                                                        data-value="ReactJs"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="checkbox-text">ReactJs</span>
                                                        </label>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="TypeScript"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="">TypeScript</span>
                                                        </label>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value=".Net"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span>.Net</span>
                                                        </label>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="angular"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span>Angular</span>
                                                        </label>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="Python"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" /><span>Salesforce</span>
                                                        </label>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="NodeJS"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" /><span>NodeJS</span>
                                                        </label>
                                                    </a>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Members(Optional)" className="col-form-label title-text">
                                        Members(Optional)
                                    </label>
                                    <input
                                        className="form-control"
                                        id="project-description"
                                        placeholder="Member Name"
                                        value={textInput}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn cancel-button"
                                data-bs-dismiss="modal"
                            >
                                <span className="cancel-text"> Cancel </span>
                            </button>
                            <button type="button" className="btn save-button" data-bs-dismiss="modal" onClick={handleSubmit}
                            >
                                <span className="save-text">  Save </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}