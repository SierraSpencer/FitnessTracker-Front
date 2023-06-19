import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { postActivities } from "../api";

export default function AllActivities() 
{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {activities, user, token} = useOutletContext();
    async function handleSubmit(event)
  {
      event.preventDefault()
      if(user) 
      {
          const result = await postActivities(token, name, description);
          console.log(result)
      }
  }
    return(
     <div>
      <h1 id="header">Activities</h1>
      {user.id && (
         <>
            <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={(event) => setName(event.target.value)} value={name}></input>
            <input placeholder="Description" onChange={(event) => setDescription(event.target.value)} value={description}></input>
            <button id="create-activity">Create Activity</button>
        </form>
         </>
        )}
      {activities.map((activity) => {
          return (
          <div key={activity.id}>
            <div>Name: {activity.name}</div>
            <div>Description: {activity.description}</div>
          </div>
        );})}   
    </div>
    )
}
