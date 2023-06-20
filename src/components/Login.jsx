import React from "react";
import './login.css';
import { useState } from 'react';
import { registerUser, loginUser } from '../api';
import { useNavigate, useOutletContext } from 'react-router';

export default function Login()
{
  const [registerUsername, setUsername] = useState('');
  const [registerPassword, setPassword] = useState('');
  const [registerFormError, formError] = useState();
  const {myProfile, setToken} = useOutletContext();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFormError, LoginFormError] = useState();
  const navigate = useNavigate();
  
  async function handleRegister(event)
  {
    event.preventDefault();
    const newUser = await registerUser(registerUsername, registerPassword);
    if (!newUser.user) 
    {
      formError(newUser.error);
      return;
    }
    console.log(newUser);
    localStorage.setItem('token', newUser.token);
    setToken(newUser.token);
    navigate('/myroutines');
  }
  
  async function handleLogin(event) 
  {
    event.preventDefault();
    const loggedInUser = await loginUser(loginUsername, loginPassword);
    if (!loggedInUser.user) 
    {
      LoginFormError(loggedInUser.error);
      return;
    }
    console.log(loggedInUser);
    localStorage.setItem('token', loggedInUser.token);
    setToken(loggedInUser.token);
    navigate('/myroutines');
  }
  
  return (
    <>
      <h3>Register</h3>
      <form id="register-form" onSubmit={handleRegister}>
        <input placeholder="Create Username" type="text" value={registerUsername} onChange={(event) => setUsername(event.target.value)}/>
        <input placeholder="Create Password" type="password" value={registerPassword} onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit">Create New User</button>
        {formError}
      </form>
      <h3>Login</h3>
      <form id="login-form" onSubmit={handleLogin}>
        <input placeholder="Username" type="text" value={loginUsername} onChange={(event) => setLoginUsername(event.target.value)}/>
        <input placeholder="Password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)}/>
        <button type="submit">Login</button>
        {loginFormError}
      </form>
    </>
  );
};
