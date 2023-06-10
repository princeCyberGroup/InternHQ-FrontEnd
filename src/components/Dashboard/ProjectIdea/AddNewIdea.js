import "./AddNewIdea.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EmptyProject } from "../EmptyStates/EmptyProject/MyIdea";
import {ReactComponent as ExpandMore} from "../ProjectIdea/expand_more.svg";

export const AddNewIdea = ({ projectDescript }) => {
    const navigate = useNavigate();
    const [first, ...rest] = projectDescript;
    const [projName, setProjName] = useState("");
    const [projDescription, setProjDescription] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [technologyNames, setTechnologyNames] = useState([]);
    // const [userId, setUserId] = useState("30");
    const [counter, setCounter] = useState(1);
    const [textInput, setTextInput] = useState('');
    const [memberNames, setMemberNames] = useState({});
    const [techNames, seTechNames] = useState({});
    const [dropDown, setDropDown] = useState(false);
    const [projNameError, setProjNameError] = useState('');
    const [projDescriptionError, setProjDescriptionError] = useState('');

    const handleClickClear = () =>{
        setTextInput('');
        setProjName("");
        setProjDescription("");
        setDropDown(false);
    }
    const handleChangeProjNameError = (event) => {
        const name = event.target.value
        setProjName(name);
        if (!name) {
            setProjNameError("Project Name is required");
        }
        else {
            setProjNameError("");
        }
    }

    const handleChangeProjDescriptionError = (event) => {
        const description = event.target.value;
        setProjDescription(description);
        if (!description) {
            setProjDescriptionError("Project Description is required");
        }
        else {
            setProjDescriptionError("");
        }
    }
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

    const handleSubmit = async (e) => {

        e.preventDefault();
        var storedObject = localStorage.getItem('userData');

        var parsedObject = JSON.parse(storedObject);

        var userId = parsedObject.userId;
        console.log(userId);
        await axios.post("https://cg-interns-hq.azurewebsites.net/projectIdea", {
            projName,
            projDescription,
            userId,
            technologyNames: techNames,
            memberNames: textInput
        }).then((res) => {
            console.log("print", res.data);
        }).catch((err) => {
            console.log(err);
        })
        setTextInput('');
        setProjName("");
        setProjDescription("");
        setDropDown(false);
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
                {projectDescript.length === 0 ? (
                    <EmptyProject />
                ) :
                    (
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
                                                    const initials = curElem
                                                        .split(" ")
                                                        .map((name) => name[0])
                                                        .join("")
                                                        .toUpperCase();

                                                    return (
                                                        <div className="project-idea-members" key={index}>
                                                            <p className="name-of-members">{initials}</p>
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
                    )
                }

                <div className="add-new-idea-container">
                    <div
                        className="add-new-idea pt-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@mdo"
                    >
                        <p className="project-p mb-0 fw-bold">
                            <span>+</span> Add New Idea
                        </p>
                    </div>
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
                                onClick={handleClickClear}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="project-name" className="col-form-label title-text">
                                        Project Name<span style={{ color: 'red' }}>*</span> {projNameError && <span style={{ color: 'red', fontSize: "11px" }}>({projNameError})</span>}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={projName}
                                        id="project-name"
                                        placeholder='Enter Project Name'
                                        onChange={handleChangeProjNameError}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="project-description"
                                        className="col-form-label title-text"
                                    >
                                        Project Description<span style={{ color: 'red' }}>*</span> {projDescriptionError && <span style={{ color: 'red', fontSize: "11px" }}>({projDescriptionError})</span>}
                                    </label>
                                    <textarea
                                        className="form-control"
                                        value={projDescription}
                                        id="project-description"
                                        placeholder='Write Here..'
                                        onChange={handleChangeProjDescriptionError}
                                        rows={3}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="technology-used" className="col-form-label title-text" required>
                                        Technology Used <span style={{ color: 'red' }}>*</span>
                                    </label>
                                </div>

                                <div className="container border">
                                    <div>
                                        <div>
                                            {/* <div className="button-group"> */}
                                            <div className="input-with-button">
                                                <input
                                                    type="text"
                                                    className="custom-input"
                                                    disabled
                                                />
                                                <button type="button" className="expand-more" onClick={() => {
                                                        setDropDown(!dropDown)
                                                    }}><ExpandMore/></button>
                                                    </div>
                                                
                                                <ul style={{ display: dropDown ? "" : "none" }} className="ul-styling">

                                                    <p
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
                                                    </p>
                                                    <p
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="TypeScript"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="checkbox-text">TypeScript</span>
                                                        </label>
                                                    </p>
                                                    <p
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value=".Net"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="checkbox-text">.Net</span>
                                                        </label>
                                                    </p>
                                                    <p
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="Angular"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="checkbox-text"> Angular</span>
                                                        </label>
                                                    </p>
                                                    <p
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="Salesforce"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="checkbox-text">Salesforce</span>
                                                        </label>
                                                    </p>
                                                    <p
                                                        href="#"
                                                        className="small text-decoration-none"
                                                        data-value="NodeJS"
                                                        tabIndex="-1"
                                                        onClick={handleOptionClick}
                                                    >
                                                        <label className="checkbox-label">
                                                            <input type="checkbox" className="checkbox-input" />
                                                            <span className="checkbox-text">NodeJS</span>
                                                        </label>
                                                    </p>
                                                </ul>
                                                
                                            {/* </div> */}
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
                                onClick={handleClickClear}
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