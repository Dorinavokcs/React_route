import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { publicUser } from '../types/user';

const initialState = {
  id: 0,
  name: "",
  email: "",
  birthdate: "",
}

const User = () => {
    const location = useLocation();
    const[users,setUsers]= useState<publicUser[]>(initialState)
  return (
    <div>
        <h1>User</h1>
        <h3>{location.pathname}</h3>
    </div>
  )
}

export default User