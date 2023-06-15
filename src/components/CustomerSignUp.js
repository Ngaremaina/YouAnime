import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


const SignUp = ({addCustomer}) => {
    const navigate = useNavigate()//defining the navigate function
    //Object that stores changes from user
    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        gender: "",
        email: "",
        age: 1,
        password:""
    })

    // Function that submit form
    const handleSubmit = (event) => {
        event.preventDefault()
         // Function to add changes to the database
        addCustomer(customer)
        navigate('/')

    }
    const handleChange = (event) => {
        const input = event.target.id
        const value = event.target.value
         // Add changes to the object
        setCustomer(prev => {return {...prev, [input]:value}})
    }
    return(
        // Form that adds data to the database
        <form onSubmit={handleSubmit} className="formcontainer">
            <h1>Customer Sign Up</h1>
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" value={customer.first_name} onChange={handleChange}/>
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" value={customer.last_name} onChange={handleChange}/>
            <label for="email">Email Address</label>
            <input type="text" id="email" value={customer.email} onChange={handleChange}/>
            <label for="phone_number">Phone Number</label>
            <input type="text" id="phone_number" value={customer.phone_number} onChange={handleChange}/>
            <label for="gender">Gender</label>
            <input type="text" id="gender" value={customer.gender} onChange={handleChange}/>
            <label for="age">Age</label>
            <input type="text" id="age" value={customer.age} onChange={handleChange}/>
            <label for="password">Password</label>
            <input type="password" id="password" value={customer.password} onChange={handleChange}/>
            <button type="submit">Submit</button>

        </form>
    )

}

export default SignUp