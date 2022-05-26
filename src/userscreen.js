
import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../../App'

const UserPage = () =>{
    const[userData,setUserData]=useContext(UserContext);

   
    return(
        <div className="container">
            <h1>User Profile</h1>
            <h4><b>User ID:</b>{userData.user.username}</h4>
            
        </div>
    )
}