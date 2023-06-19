import { useEffect, useState } from 'react';
import { registerUser, loginUser } from '../../api';
import { useNavigate, useOutletContext } from 'react-router';

const Login = () => 
{
  const [registerUsername, setUsername] = useState('');
  const [registerPassword, setPassword] = useState('');
  const [registerFormError, formError] = useState();
  const {myProfile, setToken} = useOutletContext();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFormError, LoginFormError] = useState();
  const navigate = useNavigate();
  
  async function handleRegister(e)
  {
    e.preventDefault();
    const newUser = await registerUser(registerUsername, registerPassword);
    if (!newUser.user) 
    {
      formError(newUser.error);
      return;
    }
    console.log(newUser);
    localStorage.setItem('token', newUser.token);
    setToken(newUser.token);
    navigate('/my-routines');
  }
  
  async function handleLogin(e) 
  {
    e.preventDefault();
    const loggedInUser = await loginUser(loginUsername, loginPassword);
    if (!loggedInUser.user) 
    {
      LoginFormError(loggedInUser.error);
      return;
    }
    console.log(loggedInUser);
    localStorage.setItem('token', loggedInUser.token);
    setToken(loggedInUser.token);
    navigate('/my-routines');
  }
  
  return (
    <>
      <h3>Register</h3>
      <form id="register-form" onSubmit={handleRegister}>
        <input placeholder="Create Username" type="text" value={registerUsername} onChange={(e) => setUsername(e.target.value)}/>
        <input placeholder="Create Password" type="password" value={registerPassword} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Create New User</button>
        {formError}
      </form>
      <h3>Login</h3>
      <form id="login-form" onSubmit={handleLogin}>
        <input placeholder="Username" type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}/>
        <input placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
        <button type="submit">Login</button>
        {loginFormError}
      </form>
    </>
  );
};
export default Login;
