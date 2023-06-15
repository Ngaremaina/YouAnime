import React from "react";
import { NavLink } from "react-router-dom";

const NavHeader = ({sortByTitle}) => {
    return (
        // display the navigation links in the header
        <nav className="topnav">

            <NavLink to='/' className="nav-link">Home</NavLink>
            <NavLink to='/movies' className="nav-link">Movies</NavLink>
            <NavLink to='/series' className="nav-link">Series</NavLink>
            <NavLink to='/addanimation' className="nav-link">Add New Animation</NavLink>
            <div className="topnav-right">
                <NavLink to='/directorsignup' className="nav-link">Director</NavLink>
                <NavLink to='/customersignup' className="nav-link">Customer</NavLink>
                <button className="buttonTitle" onClick={sortByTitle} style={{float: 'right'}}><i class="fa fa-sort"></i></button>

            </div>
        
        </nav>
    )

}

export default NavHeader