import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import UserId from '../utils/UserId';
import UserFirstname from '../utils/UserFirstname';
import './LoginPage.css'


function LoginPage() {

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const navigate = useNavigate() 
  const [Infos, setInfos] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Click, setClick] = useState(false)
  const [Data, setData] = useState(null)

  useEffect(() => {
    if (Email !== null && Password !== null) {
      setInfos({
        email: Email,
        password: Password
      })
    }
  }, [Click])

  useEffect(() => {
    if (Infos !== null) {
      const fetchData = async () => {
        const data = await fetch('http://localhost:5000/log', {
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
          console.log('Wrong logins')
      }
      fetchData().catch(console.error)
    }
  }, [Infos])
  
  useEffect(() => {
    const login = async () => {
      if (Data !== null) {
        console.log(Data)
        localStorage.setItem('token', JSON.stringify(Data))
        UserId(Data.token)
        UserFirstname(Data.token)
        await sleep(100)
        navigate('/')
      }
    }
    login().catch(console.error)
  }, [Data])

  return (
    <div className='login_form'>
      <div className='login_input'>
        <h1>Login Form</h1>
        <input type='text' placeholder='Email' onChange={(value) => setEmail(value.target.value)}/>
        <input type='password' placeholder='Password' onChange={(value) => setPassword(value.target.value)}/>
        <button type='button' onClick={() => setClick(!Click)}>Login</button>
        <a className='link' href='/register'>No account? Register one!</a>
      </div>
    </div>
  )
}

export default LoginPage