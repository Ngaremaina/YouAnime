import './App.css';
import React, {useState, useEffect} from 'react';
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


function App() {
  const [animations, setAnimations] = useState([])

  useEffect(() => {
    
    fetchData()
   
  
    
  }, []);


  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000")
    const jsonData = await response.json()
    setAnimations(jsonData)
  }

  const addAnimation = (data) => {
    fetch("http://127.0.0.1:8000/addanimations", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   
  }

  const editAnimation = (data, id) => {
    fetch(`http://127.0.0.1:8000/patchanimations/${id}`, {
      method:"PATCH",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   

  }

  const deleteAnimation = (id) => {
    fetch(`http://127.0.0.1:8000/deleteanimation/${id}`,{
      method:"DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const addCustomer = (data) => {
    fetch("http://127.0.0.1:8000/addcustomers", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   

  }
  const addDirector = (data) => {
    fetch("http://127.0.0.1:8000/adddirectors", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   

  }

  const searchAnimation = (search) => {
    const fetchResults = animations.filter(animation => animation.title.toLowerCase().includes(search.toLowerCase()))
    return setAnimations(fetchResults)
  }

  function sortByTitle() {
    const sortedAnimations = [...animations].sort((a, b) => a.title.localeCompare(b.title));
    setAnimations(sortedAnimations);
  }
  
  return (
    <div className="App">
      <NavHeader sortByTitle={sortByTitle}/>
      <Routes>
        <Route path='/' element={ <AnimationList animations = {animations} searchAnimation={searchAnimation}/>}></Route>
        <Route path='/:id' element = {<DetailsPage deleteAnimation = {deleteAnimation} />}></Route>
        <Route path = '/movies' element={<Movies  animations = {animations}/>}></Route>
        <Route path='/series' element={<Series  animations = {animations} />}></Route>
        <Route path='/addanimation' element = { <AddAnimation addAnimation={addAnimation} /> }></Route>
        <Route path='/editanimation/:id' element = { <EditAnimation editAnimation = {editAnimation} />}></Route>
        <Route path='/directorsignup' element={<Login addDirector={addDirector}/>}></Route>
        <Route path='/customersignup' element={<SignUp addCustomer={addCustomer} />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
