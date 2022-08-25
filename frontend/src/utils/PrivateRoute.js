import React from 'react'
import {Route, Navigate} from "react-router-dom";

function PrivateRoute(props, {children}) {
    const auth = false
    if (auth === false)
        return <Navigate to='/login'/>
    console.log('PrivateRoute works')
    return children;
        
}

export default PrivateRoute