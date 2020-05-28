import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Login.css"
const Logout = ({ appUser, setAppUser }) => {

    return (
        <div>
            <div>
                <h1 className="logout-head">You've been successfully logged out!</h1>
            </div>
            <div className="logout-bttn">
                <Link to="/">Login</Link>
            </div>
        </div>
    )
}

export default Logout
