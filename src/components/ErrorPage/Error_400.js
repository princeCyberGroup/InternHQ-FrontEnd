import React from 'react'
import Error_BadRequest from "../../Assets/Error_BadRequest.png"
import "./ErrorPage.css"
import { useNavigate } from "react-router-dom";

const Error_400 = () => {
    const navigate = useNavigate();
    return (
        <div className="container d-flex align-items-center vh-100">
            <div className="row">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                    <img src={Error_BadRequest} alt="Error 400 Image"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <h1 className = "text-center error-heading mt-3">Bad Request</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <p className = "text-center error-desc mt-0">We’re sorry, request header or cookie too large<br />
Please go back to the homepage</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                    <button className='btn error-btn' onClick={() => {navigate('/dashboard')}}>Back to home</button>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Error_400