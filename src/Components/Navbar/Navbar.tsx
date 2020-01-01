import React from 'react';

const Navbar = () => {

    return (
        <div className="navbar">
            <h1 className="logo">NILI</h1>
            <ul className="navMenu">
                <li className="navMenu">درباره نیلی</li>
                <li className="navMenu">خدمات نیلی</li>
                <li className="navMenu">ارتباط با ما</li>
            </ul>
            <div className="navAuth">
                <small className="navLogin">
                    Login
                </small>
            </div>
        </div>
    )
}

export default Navbar