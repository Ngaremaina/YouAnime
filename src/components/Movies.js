import React from "react";
import AnimationItem from "./AnimationItem";

const Movies = ({animations}) => {
    //Display movie list by type
    const animationList = animations.map(animation =>{
        if (animation.type === "Movies"){
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