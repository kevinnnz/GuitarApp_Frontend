import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return(
        <div className="header">
            <nav className="navBar">
                <ul className="navLinkList">
                    <li className="navLink"><Link to="/">Guitars</Link></li>
                    <li className="navLink"><Link to="/add/guitar">Add Guitar</Link></li>
                </ul>
            </nav>
        </div> 
    );
}

export default Navigation;