import React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
    const idRef = useRef<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        idRef.current = setTimeout(()=> {
            navigate("/users");
        }, 2000);

        // Clean up:
        return () => {clearTimeout(idRef.current!)} // Ne térjen vissza értékkel a callback!
    }, [])
  return (
    <div>
        <h1>Home</h1>
        <h3>{location.pathname}</h3>
    </div>
  )
}

export default Home