import './App.css';
import {useState, useEffect} from 'react';
import AnimationList from './components/AnimationList';
import { Routes, Route } from 'react-router-dom';
import NavHeader from './components/NavHeader';
import DetailsPage from './components/DetailsPage';
import AddAnimation from './components/AddAnimation';
import EditAnimation from './components/EditAnimation';
import Login from './components/DirectorSignUp';
import SignUp from './components/CustomerSignUp';
import Series from './components/Series';
import Movies from './components/Movies';
import { CirclesWithBar } from "react-loader-spinner"

function App() {
  const [animations, setAnimations] = useState([])
  const [loading, setLoading] = useState(false)
  //Fetch all animations from the database
  useEffect(() => {   
    fetchData()    
  }, []);

  //Function that fetches all animations
  const fetchData = async () => {
    setLoading(true)
    try{
      const response = await fetch("https://youanime-aas1.onrender.com/")
      const jsonData = await response.json()
      setAnimations(jsonData)
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
    
  }

  //Function that adds a new animation to the database
  const addAnimation = (data) => {
    fetch("https://youanime-aas1.onrender.com/addanimations", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   
  }
  //Function that patches the animation
  const editAnimation = (data, id) => {
    fetch(`https://youanime-aas1.onrender.com/patchanimations/${id}`, {
      method:"PATCH",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   

  }
  //Function that deletes the animation
  const deleteAnimation = (id) => {
    fetch(`https://youanime-aas1.onrender.com/deleteanimation/${id}`,{
      method:"DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
  //Function that adds customers to the database
  const addCustomer = (data) => {
    fetch("https://youanime-aas1.onrender.com/addcustomers", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   

  }
   //Function that adds customers to the database
  const addDirector = (data) => {
    fetch("https://youanime-aas1.onrender.com/adddirectors", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   

  }
  //Function that searches the animation by its title
  const searchAnimation = (search) => {
    const fetchResults = animations.filter(animation => animation.title.toLowerCase().includes(search.toLowerCase()))
    return setAnimations(fetchResults)
  }
  //Function that sorts the animations by the title
  function sortByTitle() {
    const sortedAnimations = [...animations].sort((a, b) => a.title.localeCompare(b.title));
    setAnimations(sortedAnimations);
  }
  
  return (
    //Display the routes to the components
    <div className="App">
    {loading ? (
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass="flex justify-center h-screen items-center"
        visible={true}
      />
    ) : (
      <>
        <NavHeader sortByTitle={sortByTitle} />
        <Routes>
          <Route path='/' element={<AnimationList animations={animations} searchAnimation={searchAnimation} />} />
          <Route path='/:id' element={<DetailsPage deleteAnimation={deleteAnimation} />} />
          <Route path='/movies' element={<Movies animations={animations} />} />
          <Route path='/series' element={<Series animations={animations} />} />
          <Route path='/addanimation' element={<AddAnimation addAnimation={addAnimation} />} />
          <Route path='/editanimation/:id' element={<EditAnimation editAnimation={editAnimation} />} />
          <Route path='/directorsignup' element={<Login addDirector={addDirector} />} />
          <Route path='/customersignup' element={<SignUp addCustomer={addCustomer} />} />
        </Routes>
      </>
    )}
  </div>

  );
}

export default App;
