import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './HomePage.css'

function HomePage() {

  const navigate = useNavigate() 
  const [Logout, setLogout] = useState(false)

  useEffect(() => {
    if (Logout === true) {
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      localStorage.removeItem('userfirstname')
      navigate('/login')
    }
  }, [Logout])

  return (
    <div>
      <div className='bar'>
        <div className='bar_button'>
          <button type='button' onClick={() => setLogout(true)}>Logout</button>
          <button type='button'>Add Task</button>
          <h1>{localStorage.getItem('userfirstname')}'s Tasks:</h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage