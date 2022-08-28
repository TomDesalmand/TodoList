import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './RegisterPage.css'

function RegisterPage() {

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const navigate = useNavigate()
  const [Infos, setInfos] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Firstname, setFirstname] = useState(null)
  const [Name, setName] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Click, setClick] = useState(false)
  const [Data, setData] = useState(null)

  useEffect(() => {
    if (Email !== null && Password !== null && Firstname !== null && Name !== null) {
      setInfos({
        email: Email,
        firstname: Firstname,
        name: Name,
        password: Password
      })
    }
  }, [Click])

  useEffect(() => {
    if (Infos !== null) {
      const fetchData = async () => {
        console.log(Infos)
        const data = await fetch('http://localhost:5000/register', {
          headers: { 
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(Infos),
        })
        const json = await data.json()
        if (data.status === 200) {
          setData(json)
        } else
          console.log('Wrong register')
      }
      fetchData().catch(console.error)
    }
  }, [Infos])

  useEffect(() => {
    const register = async () => {
      if (Data !== null) {
        console.log(Data)
        await sleep(100)
        navigate('/login')
      }
    }
    register().catch(console.error)
  }, [Data])

  return (
    <div className='register_form'>
      <div className='login_input'>
        <h1>Register Form</h1>
        <input type='text' placeholder='Email' onChange={(value) => setEmail(value.target.value)}/>
        <input type='text' placeholder='Firstname' onChange={(value) => setFirstname(value.target.value)}/>
        <input type='text' placeholder='Name' onChange={(value) => setName(value.target.value)}/>
        <input type='password' placeholder='Password' onChange={(value) => setPassword(value.target.value)}/>
        <button type="button" onClick={() => setClick(!Click)}>Register</button>
        <a className="link" href="/login">Already have an account? Login!</a>
      </div>
    </div>
  )
}

export default RegisterPage