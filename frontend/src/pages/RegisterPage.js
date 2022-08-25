import React from 'react'
import { useState, useEffect } from 'react'
import './RegisterPage.css'

function RegisterPage() {

  const [Infos, setInfos] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Firstname, setFirstname] = useState(null)
  const [Name, setName] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Click, setClick] = useState(false)

  useEffect(() => {
    if (Email !== null && Password !== null) {
      setInfos({
        email: Email,
        firstname: Firstname,
        name: Name,
        password: Password
      })
    }
  }, [Click])

  useEffect(() => {
    if (Infos != null)
      console.log(Infos)
  }, [Infos])

  return (
    <div className='register_form'>
      <div className='login_input'>
        <h1>Register Form</h1>
        <input type='text' placeholder='Email'/>
        <input type='text' placeholder='Firstname'/>
        <input type='text' placeholder='Name'/>
        <input type='password' placeholder='Password'/>
        <button type="button">Register</button>
        <a className="link" href="/login">Already have an account? Login!</a>
      </div>
    </div>
  )
}

export default RegisterPage