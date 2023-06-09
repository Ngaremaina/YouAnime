import React from "react";
import AnimationItem from "./AnimationItem";

const Movies = ({animations}) => {
    const animationList = animations.map(animation =>{
        if (animation.type === "Movie"){
            return <AnimationItem key={animation.id} title = {animation.title} cover = {animation.cover} id ={animation.id}/>
        }
        return null
        
    })
    return(
        <div>                
             <div className="cardlist">
                {animationList} 
            </div>

        </div>
       
    )

}

export default Movies