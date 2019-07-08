import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return(
        <nav className="navBar">
            <ul className="navLinkList">
                <li><Link to="/">Guitars</Link></li>
                <li><Link to="/add/guitar">Add Guitar</Link></li>
            </ul>
        </nav> 
    );
}

export default Navigation;