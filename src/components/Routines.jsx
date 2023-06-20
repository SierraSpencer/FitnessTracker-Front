import React from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function AllRoutines() 
{
    const {routines} = useOutletContext();
    return(
     <div>
        <h1 id="header">Routines</h1>
        {routines.map((routine) => {
        if(routine.isPublic) 
        {
            return(
            <div key={routine.id}>
                <Link to={`/routines/${routine.id}`}>
                <div>Name: {routine.name}</div></Link>
                <div>Goal: {routine.goal}</div>
                <div>Creator: {routine.creatorName}</div>
                {routine.activities.map(activity => 
                <div key={activity.id}>
                    <div>Activity: {activity.name}</div>
                    <div>Description: {activity.description}</div>
                    <div>Duration: {activity.duration}</div>
                    <div>Count: {activity.count}</div>
                </div>
                )}
            </div>
            );}})
        }   
        </div>
    )
}
