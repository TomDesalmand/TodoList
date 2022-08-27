function UserId(token) {
    const fetchUserId = async () => {
        const data = await fetch('http://localhost:5000/user', {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          method: 'GET',
        })
        const json = await data.json()
        if (data.status === 200) {
          localStorage.setItem('userid', json.id)
          console.log(localStorage.getItem('userid'))
        } else
          console.log('No user info')
      }
      fetchUserId().catch(console.error)
}

export default UserId