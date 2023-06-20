import { useNavigate, useOutletContext } from 'react-router';
import { seeUserPublicRoutines, deleteRoutine } from '../api';
import { useState } from 'react';

export default function MyRoutines()
{
  const { myProfile, token, setAllRoutines } = useOutletContext();
  const [userRoutines, setUserRoutines] = useState([]);
  const [editMode, setEditMode] = useState('');
  const [editRoutine, setEditRoutine] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (token && myProfile.id) 
    {
      (async () => {
        const routines = await seeUserPublicRoutines(token, myProfile.username);
        setUserRoutines(routines);
      })();
    }
  }, [myProfile]);
  const handleDelete = async (routineId) => 
  {
    await deleteRoutine(token, routineId);
    const routines = await seeUserPublicRoutines(token, myProfile.username);
    setUserRoutines(routines);
  };

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <Link to="/newroutine">Add Routine</Link>
      <h2>My Routines</h2>
      {myRoutines.map((routine) => {
      if(routine.creatorName === user.username || !routine.isPublic) 
      {
        return (
          <div key={routine.id}>
              <Link to={`/routines/${routine.id}`}>
              <div>Name: {routine.name}</div></Link>
              <div>Goal: {routine.goal}</div>
              <div>Creator: {routine.creatorName}</div>
              <button>Edit Routine</button>
              <button>Delete Routine</button>
              {!routine.isPublic && (<><button>Make Public</button></>)}
              {!routine.activity && (<><button>Add Activity</button></>)}
              {routine.activities.map(activity => 
              <div key={activity.id}>
              <div>Activity: {activity.name}</div>
              <div>Description: {activity.description}</div>
              <div>Duration: {activity.duration}</div>
              <div>Count: {activity.count}</div>
              <button>Add Activity</button>
              <button>Edit Activity</button>
              <button>Delete Activity</button>
              </div>
              )}
          </div>
         )}
        })}
    </div>)
  }
