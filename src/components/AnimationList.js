import React,{useState} from "react";
import AnimationItem from "./AnimationItem";

const AnimationList = ({animations, searchAnimation}) => {
    const [search, setSearch] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        searchAnimation(search)
    }
    const animationList = animations.map(animation =>{
        return <AnimationItem key={animation.id} title = {animation.title} cover = {animation.cover} id ={animation.id}/>
    })
    return(
        <div>
            <form className="search" onSubmit={handleSubmit}>
                    <input type="text"id="searchname" placeholder="Search by the Title"value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit"><i class="fa fa-search"></i></button>
            </form>
                
             <div className="cardlist">
                {animationList} 
            </div>

        </div>
       
    )
}

export default AnimationList