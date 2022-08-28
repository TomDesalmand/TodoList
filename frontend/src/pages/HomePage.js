import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './HomePage.css'

function HomePage() {

  const options = [
    {
      label: "not started",
      value: "not started",
    },
    {
      label: "todo",
      value: "todo",
    },
    {
      label: "in progress",
      value: "in progress",
    },
    {
      label: "done",
      value: "done",
    },
  ];

  const navigate = useNavigate() 
  const [Logout, setLogout] = useState(false)
  const [AddTask, setAddTask] = useState(false)
  const [TaskAdded, setTaskAdded] = useState(0)
  const [Title, setTitle] = useState(null)
  const [Description, setDescription] = useState(null)
  const [DueTime, setDueTime] = useState(null)
  const [Status, setStatus] = useState(null)
  const [Infos, setInfos] = useState(null)

  useEffect(() => {
    if (Logout === true) {
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      localStorage.removeItem('userfirstname')
      navigate('/login')
    }
  }, [Logout])

  useEffect(() => {
    if (Title !== null && Description !== null && DueTime !== null && Status !== null && TaskAdded > 0) {
      setInfos({
        title: Title,
        description: Description,
        due_time: DueTime,
        user_id: localStorage.getItem('userid'),
        status: Status,
      })
    }
  }, [TaskAdded])

  useEffect(() => {
    if (Infos != null) {
      console.log(Infos)
      const fetchTask = async () => {
        const data = await fetch('http://localhost:5000/todos', {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          method: 'POST',
          body: JSON.stringify(Infos)
        })
        const json = await data.json()
        if (data.status === 200) {
          console.log(json)
          setAddTask(false)
        } else
          console.log('Failed to add task')
      }
      fetchTask().catch(console.error)
    }
  }, [Infos])

  return (
    <div>
      <div className='bar'>
        <div className='bar_button'>
          <button type='button' onClick={() => setLogout(true)}>Logout</button>
          <button type='button' onClick={() => setAddTask(!AddTask)}>Add Task</button>
        </div>
      </div>
      {
        AddTask ?
        <div className='task_form'>
          <div className='task_input'>
            <button type='button' style={{width:'40px', marginLeft:'150%', marginBottom:'0px'}} onClick={() => setAddTask(false)}>X</button>
            <h1>Add a Task:</h1>
            <input type='text' placeholder='Title' onChange={(value) => setTitle(value.target.value)}/>
            <input type='text' placeholder='Description' onChange={(value) => setDescription(value.target.value)}/>
            <input type='text' placeholder='YYYY-MM-DD HH:MM:SS' onChange={(value) => setDueTime(value.target.value)}/>
            <select onChange={(value) => setStatus(value.target.value)}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            <button type='button' onClick={() => setTaskAdded(TaskAdded + 1)}>Add Task</button>
          </div>
        </div>
          :
          void(0)
      }
    </div>
  )
}

export default HomePage