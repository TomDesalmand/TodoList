import React from 'react'
import { useState, useEffect } from 'react'
import './LoginPage.css'


function LoginPage() {

  const [Infos, setInfos] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Click, setClick] = useState(false)
  const [Data, setData] = useState(null)

  useEffect(() => {
    if (Email !== null && Password !== null) {
      setInfos({
        'email': Email,
        'password': Password
      })
    }
  }, [Click])

  useEffect(() => {
    if (Infos !== null) {
      const fetchData = async () => {
        console.log(Infos)
        const data = await fetch('http://localhost:5000/log', {
          method: 'POST',
          body: Infos,
        })
        const json = await data.json()
        setData(json)
      }
      fetchData().catch(console.error)
    }
  }, [Infos])

  useEffect(() => {
    if (Data !== null)
      console.log(Data)
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