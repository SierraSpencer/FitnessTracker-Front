import { useOutletContext, useParams } from 'react-router';
import './Routine.css';
import { useEffect, useState } from 'react';
import {getAllRoutines,seeUserPublicRoutines,removeActivityFromRoutine,fetchMyProfile} from '../api';

export default function Routine() 
{
  const { routineId } = useParams();
  const { allRoutines, setAllRoutines, myProfile, token } = useOutletContext();
  const [routine, setRoutine] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!allRoutines[0]) 
    {
      (async () => {
        const routines = await getAllRoutines();
        setAllRoutines(routines);
      })();
    } 
    else 
    {
      let routineValue = allRoutines.find((routine) => routine.id == routineId);
      if (routineValue) 
      {
        setRoutine(routineValue);
      }
    }

    if (!routine.id && myProfile.id) 
    {
      (async () => {
        const routines = await seeUserPublicRoutines(token, myProfile.username);
        for (let result of routines) 
        {
          if (result.id == routineId)
          {
            console.log(result);
            setRoutine(result);
          }
        }
      })();
    }
  });

  const handleDelete = async (routineActivityId) => {
    const removedRoutineActivity = await removeActivityFromRoutine(routineActivityId,token);

    if (removedRoutineActivity.success) 
    {
      window.location.reload(false);
    }
  };

  return (
    <>
      {routine.id ? (
        <div id="single-routine">
          <div id="single-routine-header">
            <h2 id="single-routine-name">{routine.name}</h2>
            {!routine.isPublic && (
              <p>
                {'('}This routine is set to "Private" and cannot be shared with
                others{')'}
              </p>
            )}
            <h3 id="single-routine-creator">
              Created by {routine.creatorName}
            </h3>
            <h4 id="single-routine-goal">Goal: {routine.goal}</h4>
          </div>
          <h3 id="activity-details-label">Activity Details:</h3>
          <div id="single-routine-activity-list">
            {routine.activities.map((activity, idx) => {
          
              return (
                <div className="single-routine-activity" key={activity.id}>
                  <p>
                    {idx + 1}. {activity.name}
                  </p>
                  <p>Description: {activity.description}</p>
                  <p>Count: {activity.count}</p>
                  <p>Duration: {activity.duration}</p>
                  {routine.creatorName === myProfile.username && (
                    <div className="edit-routine-activities">
                      <button onClick={() => setEditMode('Duration/Count')}>
                        Change Count and/or Duration
                      </button>
                      {editMode === 'Duration/Count' && (
                        <PopUpEdit
                          token={token}
                          editMode={editMode}
                          setEditMode={setEditMode}
                          routine={routine}
                          activity={activity}
                        />
                      )}
                      <button
                        onClick={() => handleDelete(activity.routineActivityId)}
                      >
                        Delete Activity From Routine
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h4>
          A Routine with that ID does not exist or is a Private routine of
          another user{' '}
        </h4>
      )}
    </>
  );
};
