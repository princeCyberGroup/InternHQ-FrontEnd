import '../associateConsultant/associateConsultant.css';
import React, { useState, useEffect } from 'react';
import { ReactComponent as DownArrow } from "../Assets/chevron-down.svg";
import { ReactComponent as UpArrow } from "../Assets/chevron-up.svg";


export default function AssociateConsultant(props) {
    const [expandedMentor, setExpandedMentor] = useState(null);
    // const handleExpand = (Uid) => {   //change it
    //     if (expandedMentor === Uid) {
    //         setExpandedMentor(null);
    //     } else {
    //         setExpandedMentor(Uid);
    //     }
    // };
    console.log(props.data);
    return (
        <>
            <div>
                <div className='about-associate'>Associate Consultant</div>
              
                     <div className='card associate-card'>
                        <div className='search-associate'>search</div>
                        {props.data && props.data.map((userData)=>{
                    return <>
                        <div className='associate-consultant'>
                            <div className='row'>
                                <div className='col frame'>
                                    <p style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>VS</p>

                                </div>
                                <div className='col'>
                                    <div className='frame-text'>{userData.name}</div>
                                    <div className='frame-id'>{userData.userId}</div>
                                </div>
                            </div>
                        </div>
                        </>
                   
                })} 
                    </div>
                  
            </div>
        </>
    )
}