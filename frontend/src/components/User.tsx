import React from 'react';
import {} from './User.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { publicUser } from '../types/user';
import {delUser, getUsers } from '../services/service';

const initialState = [{
  id: 0,
  name: "",
  email: "",
  birthdate: "",
}]

const User = () => {
  const location = useLocation();
  const [users, setUsers] = useState<publicUser[]>(initialState)
  const [update, setUpdate] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      const resData = data.map(u => ({
        ...u,
        birthdate: (new Date(u.birthdate!))
          .toLocaleDateString
          (`hu-Hu`,
            {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            })
      }))
      setUsers(resData)
    })
  }, [update])

const onDelete =async (id:number)=>{
  const user = await delUser(id)
  setUsers(prev =>prev.filter(u => u.id !== user.id))
  setUpdate(prev =>!prev)
}

  return (
    <div>
      <p>{location.pathname}</p>
      {users.map(u =>
        <article id={String(u.id)}>
          <h3>{u.name}</h3>
          <p>{u.email}</p>
          <p>{u.birthdate}</p>
          <div className='buttons'>
            <button>Modosítás</button>
            <button
            onClick={()=>onDelete(u.id)}>törles</button>
          </div>
        </article>)}
    </div>
  )
}

export default User