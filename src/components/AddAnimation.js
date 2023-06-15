import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAnimation = ({addAnimation}) => {
    const navigate = useNavigate()//defining the navigate function
     //Object that stores changes from user
    const [animation, setAnimation] = useState({
        title:"",
        plot:"",
        year:"",
        cover:"",
        type:"",
        video_link:"",
        directors_id:1,
        genres_id:1
    })
    // Function that submit form
    const handleSubmit = (event) => {
        event.preventDefault()
         // Function to add changes to the database
        addAnimation(animation)
         // navigate back to home page
        navigate('/')

    }
    // Function to handle changes in the form
    const handleChange = (event) => {
        const input = event.target.id
        const value = event.target.value
          // Add changes to the object
        setAnimation(prev => {return {...prev, [input]:value}})
    }

    return (
         // Form that adds data to the database
        <form onSubmit={handleSubmit} className="formcontainer">
            <h1>Add Animation</h1>
            <label for="title">Animation Title</label>
            <input type="text" id="title" value={animation.title} onChange={handleChange}/>
            <label for="plot">Animation Plot</label>
            <input type="text" id="plot" value={animation.plot} onChange={handleChange}/>
            <label for="year">Year</label>
            <input type="date" id="year" value={animation.year} onChange={handleChange}/>
            <label for="cover">Animation Cover</label>
            <input type="text" id="cover" value={animation.cover} onChange={handleChange}/>
            <label for="cover">Animation Type</label>
            <select id="type" value={animation.type} onChange={handleChange}>
                <option>Movies</option>
                <option>Series</option>
            </select>
            <label for="video_link">YouTube ID</label>
            <input type="text" id="video_link" value={animation.video_link} onChange={handleChange}/>
            <label for="directors_id">Directors ID</label>
            <input type="number" id="directors_id" value={animation.directors_id} onChange={handleChange}/> 
            <label for="genres_id">Genre ID</label>
            <input type="number" id="genres_id" value={animation.genres_id} onChange={handleChange}/>
            
            <button type="submit">Submit</button>
        </form>
    )

}

export default AddAnimation