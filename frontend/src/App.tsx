import './App.css';
import Home from './components/Home';
import Product from './components/Product';
import User from './components/User';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <nav>
      {/*Statikus navigációhoz kell*/}
      <Link to='/home'>Kezdőlap</Link>
      <Link to="/users">Felhasználók</Link>
      <Link to="/products">Termékek</Link>
      {/*Ugrási helyek meghatározásához kell (nem csak statikushoz)*/}
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/users' element={<User/>}/>
        <Route path='/products' element={<Product/>}/>
      </Routes>
    </nav>
    </BrowserRouter>
  )
}

export default App
