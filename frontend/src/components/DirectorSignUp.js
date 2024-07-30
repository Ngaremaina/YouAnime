import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ({addDirector}) => {
    const navigate = useNavigate()//defining the navigate function
    //Object that stores changes from user
    const [director, setdirector] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        gender: "",
        email: "",
        age: 1
    })
    // Function that submit form
    const handleSubmit = (event) => {
        event.preventDefault()
           // Function to add changes to the database
        addDirector(director)
         // navigate back to home page
        navigate('/')

    }
      // Function to handle changes in the form
    const handleChange = (event) => {
        const input = event.target.id
        const value = event.target.value
         // Add changes to the object
        setdirector(prev => {return {...prev, [input]:value}})
    }
    return(
        //Form that adds new director
        <form onSubmit={handleSubmit} className="formcontainer">
            <h1>Director Sign Up</h1>
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" value={director.first_name} onChange={handleChange}/>
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" value={director.last_name} onChange={handleChange}/>
            <label for="email">Email Address</label>
            <input type="text" id="email" value={director.email} onChange={handleChange}/>
            <label for="phone_number">Phone Number</label>
            <input type="text" id="phone_number" value={director.phone_number} onChange={handleChange}/>
            <label for="gender">Gender</label>
            <input type="text" id="gender" value={director.gender} onChange={handleChange}/>
            <label for="age">Age</label>
            <input type="text" id="age" value={director.age} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )

}

export default Login