import React from "react";
import { useState } from 'react';
import { postActivities } from '../../api';
import { useOutletContext } from 'react-router';

export default function Activities() 
{
  const { allActivities, setAllActivities } = useOutletContext();

  useEffect(() => {
    (async () => 
     {
      const allActivities = await postActivities();
      setAllActivities(allActivities);
      console.log(allActivities[0]);
    })();
  }, []);

  return (
    <>
      <p>Returning {allActivities.length} activities...</p>
      {allActivities.map((activity) => {
        return (
          <div key={activity.id} className="activity-card">
            <h4>{activity.name}</h4>
            <p>Description: {activity.description}</p>
          </div>
        );
      })}
    </>
  );
};
