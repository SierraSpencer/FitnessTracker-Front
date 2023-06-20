import { useEffect, useState } from 'react';
import Nav from '../components/nav/nav';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchMyProfile } from '../api';

export default function Root() 
{
  const [token, setToken] = useState('');
  const [myProfile, setMyProfile] = useState({});
  const [allRoutines, setAllRoutines] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('token')) 
    {
      setToken(localStorage.getItem('token'));
    }
    if (token !== '') 
    {
      (async () => {
        const profileValues = await fetchMyProfile(token);
        setMyProfile(profileValues);
      })();
    }
  }, [token]);
  return (
    <>
      <Header myProfile={myProfile} />
      <Nav myProfile={myProfile} setMyProfile={setMyProfile} />
      <div id="main">
        <Outlet
          context={{
            allRoutines,
            setAllRoutines,
            allActivities,
            setAllActivities,
            token,
            setToken,
            myProfile,
            setMyProfile,
          }}
        />
      </div>
    </>
  );
}
