import React from "react";
import AnimationItem from "./AnimationItem";

const Series = ({animations}) => {
     //Display series list by type
    const animationList = animations.map(animation =>{
        if (animation.type === "Series"){
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

export default Series