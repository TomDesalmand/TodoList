import React, { useState } from 'react'
import { Navigate } from "react-router-dom";


function PrivateRoute({children}) {
    if (localStorage.getItem('token') === null)
        return <Navigate to='/login'/>
    return children;
        
}

export default PrivateRoute 