import React from "react";
import { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams} from "react-router-dom";

export default function Routine() 
{
    const { routineId } = useParams();
    const { routines, user } = useOutletContext()
    const routine = routines.find((routine) => routine.id == routineId);
    console.log(routine)
    if(!routine)  
    {
        return <></>
    }

    return ( 
    <div>
      <h1>Routine</h1>
      <div>Name: {routine.name}</div>
      <div>Goal: {routine.goal}</div>
      <div>Creator: {routine.creatorName}</div>
      {routine.creatorName === user.username && (<><Link to={`/routines/${routine.id}/edit`} >Edit Routine</Link>
      )} {routine.activities.map(activity => 
      <div key={activity.id}>
        <div>Activity: {activity.name}</div>
        <div>Description: {activity.description}</div>
        <div>Duration: {activity.duration}</div>
        <div>Count: {activity.count}</div>
      </div>
      )}
    </div>
    )
}
