import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddProject = ({ projectApiDataa }) => {
    const navigate = useNavigate();
    const [first, ...rest] = projectApiDataa;
    const [projName, setProjName] = useState("");
    const [projDescription, setProjDescription] = useState("");
    const [technologyNames, setTechnologyNames] = useState([]);
    const [userId, setUserId] = useState("30");
    const [projectLink,setProjectLink]=useState("");
    const [hostedLink, setHostedLink] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [counter, setCounter] = useState(1);
    const [textInput, setTextInput] = useState('');
    const [memberNames, setMemberNames] = useState({});
    const [techNames, seTechNames] = useState({});
    const [dropDown, setDropDown] = useState(false);

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    //     const { value } = event.currentTarget.dataset;
    //     const isChecked = event.currentTarget.querySelector('input').checked;

    //     if (isChecked) {
    //         const optionObject = { [`tech${counter}`]: value };
    //         console.log(optionObject, "Valuesesars")
    //         setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, optionObject]);
    //         setCounter((prevCounter) => prevCounter + 1);
    //     } else {
    //         setSelectedOptions((prevSelectedOptions) =>
    //             prevSelectedOptions.filter((option) => Object.values(option)[0] !== value)
    //         );
    //     }
    //     setTechnologyNames(selectedOptions);
    //     console.log(selectedOptions, "This is selectedOptions")
    //     console.log(technologyNames, "This is technologyNames")

    // };
   
    let dataArr= {
    }
    const handleOptionClick = (event) => {
        const { value } = event.currentTarget.dataset;
        const isChecked = event.currentTarget.querySelector('input').checked;

        if (isChecked) {
            
            var optionObject = `tech${counter}`;
            technologyNames.push(value)
            setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, optionObject]);
            setCounter((prevCounter) => prevCounter + 1);
        } else {
            setSelectedOptions((prevSelectedOptions) =>
                prevSelectedOptions.filter((option) => Object.values(option)[0] !== value)
            );
        }
    };
    const handleClick = async (e) => {
        e.preventDefault();
        const data = { projectApiDataa }
        navigate('/all-projects', { state: projectApiDataa });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://cg-interns-hq.azurewebsites.net/Project", {
            projName,
            projDescription,
            userId,
            projectLink,
            hostedLink,
            technologyNames:techNames,
            memberNames
        }).then((res) => {
            console.log("print", res.data);
        }).catch((err) => {
            console.log(err);
        })
        setTextInput('');
        setProjName("");
        setProjDescription("");
        setProjectLink("");
        setHostedLink("");
    }

    useEffect(() => {
        const texts = textInput.split(',').map((text) => text.trim());
        const textObj = {};
    
        texts.forEach((text, index) => {
          textObj[`member${index + 1}`] = text;
        });
    
        
        technologyNames.forEach((curElem,index)=>{
            techNames[`tech${index+1}`]=curElem
        })
        setMemberNames(textObj);
       
      }, [textInput]);

    return (
        <>
            <div className="card-body pb-0">
                <div className="project-card-text-row">
                    <p className="project-card-text">
                        A star will be rewarded to you as a token of appreciation
                        for your hardwork and dedication upon the successful
                        completion of the project.
                    </p>
                </div>
                <div className="project-idea">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <p class="text mb-0 ms-1">Project</p>
                        </div>
                        <button
                            type="button" onClick={(e) => {
                                handleClick(e)
                            }} class="view-all">
                            View All
                        </button>
                    </div>
                </div>

                <div className="project-recipe-row mb-5">
                    <div className="recipe-text project-recipe-name">
                        <h5 className="fw-bold">{first.projectNames}</h5>
                        <div className="project-link-1">
                            <a href="#" target="_blank" rel="noopener noreferrer">{first.projectLink}</a>
                        </div>

                        <div className="technology-used fw-bold">Technology Used:</div>
                        <div className="technology-badges">
                            {first.technology.map((currElem, index) => {
                                if (currElem != null) {
                                    return (
                                        <div className="technology-badge-1">{currElem}</div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                </div>
                <div
                    className="add-project mt-5  pt-4 pb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                >
                    <p className="project-p fw-bold mb-4 mt-4">
                        <span className="fw-bold">+</span> <b>Add Project</b>
                    </p>
                </div>
            </div>
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 add-project-wrapper" id="exampleModalLabel">
                                Add Project
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="project-name" class="col-form-label title-text">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="project-name"
                                        value={projName}
                                        placeholder="Enter Project Name"
                                        onChange={(event) => setProjName(event.target.value)}
                                    />
                                </div>

                                <div class="mb-3">
                                    <label
                                        for="project-description"
                                        class="col-form-label title-text"
                                    >
                                        Project Description
                                    </label>
                                    <textarea
                                        class="form-control"
                                        id="project-description"
                                        value={projDescription}
                                        placeholder="Write Here..."
                                        onChange={(event) => setProjDescription(event.target.value)}
                                        rows={3}
                                    ></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="technology-used" class="col-form-label title-text">
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
                                                            <span className="checkbox-text">DotNet</span>
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
                                                            <span className="checkbox-text">Angular</span>
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
                                                            <span className="checkbox-text">NodeJs</span>
                                                        </label>
                                                    </p>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="Project Link" class="col-form-label title-text">
                                        Project Link
                                    </label>
                                    <input class="form-control" id="project-link" value={projectLink}
                                    onChange={(event) => setProjectLink(event.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="Hosted Link(Optional)"
                                        class="col-form-label title-text"
                                    >
                                        Hosted Link(Optional)
                                    </label>
                                    <input class="form-control" id="hosted-link" value={hostedLink}
                                    onChange={(event) => setHostedLink(event.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label for="Members(Optional)" class="col-form-label title-text">
                                        Members(Optional)
                                    </label>
                                    <input
                                        class="form-control"
                                        id="project-description"
                                        placeholder="Member Name"
                                        value={textInput}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                className="btn cancel-button"
                                data-bs-dismiss="modal"
                            >
                              <span className="cancel-text">  Cancel</span>
                            </button>
                            <button type="button" className="btn save-button" data-bs-dismiss="modal" onClick={handleSubmit}>
                               <span className="save-text"> Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}