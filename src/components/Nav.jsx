import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav(myProfile, setMyProfile) 
{
  const navigate = useNavigate();
  function handleLogout()
  {
    setMyProfile({});
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div id="nav">
      <div id="nav-links">
        <Link to="/"><div>Home</div></Link>
        <Link to="/routines"><div>Routines</div></Link>
        <Link to="/activities"><div>Activities</div></Link>
        {myProfile.id ? (
            <><Link to="/my-routines"><div>MyRoutines</div></Link>
            <div id="logout-link" onClick={handleLogout}>Logout</div></>
        ) : (
          <Link to="/login"><div>Login/Register</div></Link>
        )}
      </div>
    </div>
  );
};
