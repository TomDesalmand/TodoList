function UserFirstname (token) {
    const fetchUserFirstname = async () => {
        const data = await fetch('http://localhost:5000/user', {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          method: 'GET',
        })
        const json = await data.json()
        if (data.status === 200) {
          localStorage.setItem('userfirstname', json.firstname)
          console.log(localStorage.getItem('userfirstname'))
        } else
          console.log('No user info')
      }
      fetchUserFirstname().catch(console.error)
}

export default UserFirstname