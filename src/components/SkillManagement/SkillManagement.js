import React from "react";
import './skillmanagement.css';
import TakeTest from "./TakeTest/TakeTest";
import SkillsAdded from "./SkillsAdded/SkillsAdded";
const SkillManagement = () => {

    return (
        <>
            <div class="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="SM-nav-bar">
                            <p>Dashboard &gt; Skill Management</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class=" col-md-9">
                        <TakeTest />
                    </div>
                    <div class=" col-md-3">
                        <SkillsAdded />
                    </div>
                </div>
            </div>
        </>
    );

}

export default SkillManagement
