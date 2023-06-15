import React from "react";
import { Link } from "react-router-dom";

const AnimationItem = ({id, title, cover}) => {
    return(
        // display all data in cards
        <div className="card">
            <img src={cover} alt={title}/>
            <div className="container">
                <p>{title}</p>
                <Link to={`/${id}`} className="links">Show More</Link> 
            </div>     
        </div>
    )

}

export default AnimationItem