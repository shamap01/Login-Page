import React, { useState } from 'react'

export default function SignupForm() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='container'>
      <div className='form-container'></div>
      <div className='form-toggle'>
        <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
        <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Signup</button>
      </div>
      {isLogin ? <>
        <div className='form'>
          <h2>Login form</h2>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <a href='#'>Forgot Password?</a>
          <button>Login</button>
          <p>Not a Member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a></p>
        </div>
      </> : <>
        <div className='form'>
          <h2>Signup form</h2>
          <input type='text' placeholder='Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input type='password' placeholder='Confirm Password' />
          <button>Signup</button>
        </div>
      </> }
    </div>
  )
}
