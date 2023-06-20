import '../associateConsultant/associateConsultant.css';
import React, { useState, useEffect } from 'react';
import { ReactComponent as DownArrow } from "../Assets/chevron-down.svg";
import { ReactComponent as UpArrow } from "../Assets/chevron-up.svg";
import { ReactComponent as SearchIcon } from '../Assets/search.svg';
import { ReactComponent as ArrowDown } from "../Assets/chevron-down.svg";

function getInitials(name) {
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0).toUpperCase());
    return initials.join('');
}
export default function AssociateConsultant(props) {

    const [searchFilterValue, setSearchFilterValue] = useState("");
    const [originalTests, setOriginalTests] = useState(props.data);
    const [expandedMentor, setExpandedMentor] = useState(null);
    const handleFiltersChange = () => {
        const getFilterItems = (items, searchValue) => {
            if (searchValue) {
                let fitlerData = items.filter((item) =>
                    item.name?.toLowerCase().includes(searchValue.toLowerCase())
                );
                return fitlerData;
            }
            return items;
        };
        const filters = getFilterItems(props.data, searchFilterValue);
        setOriginalTests(filters);
    }
    useEffect(() => {
        handleFiltersChange();
        // handleExpand();
    }, [searchFilterValue])

    const handleExpand = (intId) => {

        if (expandedMentor === intId) {

            setExpandedMentor(null);

        } else {

            setExpandedMentor(intId);

        }

    };

    function renderAssociates(userData){
        const initials = getInitials(userData.name);
        return (
            <>
                <div key={userData.intId} className='card associate-consultant-mapped-card' >
                    <div className=" row mentor-wrapper">
                        <div className=" col-4 frame">
                        <p style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>{initials}</p> 
                        </div>
                        <div className=" col-4 ">
                        <div className='frame-text'>{userData.name}</div>
                        <div className='frame-id'>{userData.intId}</div>
                        </div>
                        <div className=" col-4">
                            <span  style={{marginLeft :"150px"}}onClick={() => handleExpand(userData.intId)} className="expand-arrow">{expandedMentor === userData.intId ? <UpArrow /> : <DownArrow />}</span>
                        </div>
                    </div>
                    {expandedMentor === userData.intId && (
                        <div className="row mt-3">

                            <div className="technology">

                                <p className='tech'>Technology:</p>
                                {userData.techNames.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="tech-badge"
                                    >
                                        {skill.toUpperCase()} {/*Replace with mentorskills from API response */}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }

    return (
        <>
            <div style={{
                marginLeft: "194px"
            }}>
                <div className='about-associate'>Associate Consultant</div>

                <div className=' associate-card  ' style={{ maxHeight: "375px", overflow: "auto" }}>
                    <div>
                        <input
                            className="search-associate "
                            type="text"
                            value={searchFilterValue}
                            placeholder="Search"
                            onChange={(event) => {
                                event.preventDefault();
                                setSearchFilterValue(event.target.value)
                            }}
                        />
                    </div>
                    {props.data && (props.data).map((userData) => {
                    })}
                    {originalTests?.length === 0 ?(
                        props.data?.map((userData) => renderAssociates(userData))
                    ):(
                        originalTests?.map((userData)=> renderAssociates(userData))
                    )}
                </div>
            </div>
        </>
    )
}