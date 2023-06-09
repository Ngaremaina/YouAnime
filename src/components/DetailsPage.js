import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const DetailsPage = ({deleteAnimation}) => {
    const [animations, setAnimations] = useState("")
    const [directors, setDirectors] = useState([])
    const [genres, setGenres] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const { title, cover, video_link, plot, year, type, directors_id, genres_id } = animations
    console.log(id)
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/${id}`)
        .then(res => res.json())
        .then(data => setAnimations(data))
        
      }, [id])

      useEffect(() => {
        fetch(`http://127.0.0.1:8000/getdirectors/`)
        .then(res => res.json())
        .then(data => setDirectors(data))    
      }, [])

      useEffect(() => {
        fetch(`http://127.0.0.1:8000/getgenres/`)
        .then(res => res.json())
        .then(data => setGenres(data))    
      }, [])
    
    
    const handleDelete = () => {
        deleteAnimation(id) 
        navigate('/')    
    }

    const showDirector = directors.map(director => {
        console.log(director.id) 
        if (director.id === directors_id){
            return <p>Created by {director.first_name} {director.last_name}</p> 
        }  
        return null
    }) 

    // console.log(genres)
    const showGenres = genres.map(genre => {
        console.log(genre.id)
        if (genre.id === genres_id){
            return <p>{genre.name}</p>
        }
        return null
    })

    return(
        <div>
            <iframe width="100%" height="500" style={{paddingBottom: "20px"}} src={`https://www.youtube.com/embed/${video_link}`} title={title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div className="details">
                <img src={cover} alt={title}/>
                <div className="det">
                    <p>{title}</p>
                    <p>{plot}</p>
                    <p>{year}</p>
                    <p>{type}</p>
                    {showDirector}
                    {showGenres}
                    
                <div>
                    <Link to ={`/editanimation/${id}`} className="editlink">Edit Animation</Link>
                    <button onClick={handleDelete} className="deletebutton">DELETE</button>
                </div>

            </div>
                
            </div>
            
        </div>
    )

}

export default DetailsPage