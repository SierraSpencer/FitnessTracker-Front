import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRoutine } from "../api";

export default function NewRoutine() 
{
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState("")
    const {token, setRoutines, routines} = useOutletContext();
    const navigate = useNavigate();

  async function handleSubmit(event)
  {
    event.preventDefault()
    try 
    {
      if(token)
      {
        const result = await postRoutine(token, name, goal, isPublic);
        setRoutines([result, ...routines]);
        setName("");
        setGoal("");
        setIsPublic(false);
        navigate("/myroutines")
       } 
      } catch(error) 
      {
          console.error(error)
    }
    }
    return (
    <div>
        <h1>Create Routine</h1>
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={(event) => setName(event.target.value)} value={name}></input>
            <input placeholder="Goal" onChange={(event) => setGoal(event.target.value)} value={goal}></input>
            <label id="public">Public?</label>
            <input type="checkbox" onChange={() => setIsPublic(!isPublic)} value={isPublic}></input>
            <div id="reg-err">{error}</div>
            <button id="create-routine">Create Routine</button>
        </form>
    </div>
    )
}
