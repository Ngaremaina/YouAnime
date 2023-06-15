import React,{useState} from "react";
import AnimationItem from "./AnimationItem";

const AnimationList = ({animations, searchAnimation}) => {
    const [search, setSearch] = useState("")
    //handle search data 
    const handleSubmit = (e) => {
        e.preventDefault()
        searchAnimation(search)
    }
    // Display all movies and series in the home page
    const animationList = animations.map(animation =>{
        return <AnimationItem key={animation.id} title = {animation.title} cover = {animation.cover} id ={animation.id}/>
    })
    return(
        <div>
            {/* Display search form */}
            <form className="search" onSubmit={handleSubmit}>
                    <input type="text"id="searchname" placeholder="Search by the Title"value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit"><i class="fa fa-search"></i></button>
            </form>
              {/* Display all movies and series   */}
             <div className="cardlist">
                {animationList} 
            </div>

        </div>
       
    )
}

export default AnimationList