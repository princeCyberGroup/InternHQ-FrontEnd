import React from 'react'
import Error_NotFound from "../../Assets/Error_NotFound.png"
import "./ErrorPage.css"
import { useNavigate } from "react-router-dom";

const Error_404 = () => {
    const navigate = useNavigate();
  return (
    <div className="container d-flex align-items-center vh-100">
        <div className="row">
            <div className="row">
                <div className="col d-flex justify-content-center">
                <img src={Error_NotFound} alt="Error 404 Image"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <h1 className = "text-center error-heading">Page Not Found</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <p className = "text-center error-desc">We’re sorry, the page you requested could not be found.<br />
Please go back to the homepage</p>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center">
                <button className='btn error-btn' onClick={() => navigate('/dashboard')}>Back to home</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Error_404