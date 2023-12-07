import { useState } from 'react';
import './components/css/App.css';
import Navbar from './components/Navbar';
import User from './User.js'
import About from './About.js'
import Home from './Home.js';
import Shop from './Shop.js';
import Contact from './Contact.js';
import Cart from './Cart.js';
import Wishlist from './Wishlist.js';
import Error404 from './Error404.js';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Footer from './components/Footer.js';

function App() {

  const [mode,setMode] = useState('light')
  //Toggle between light and dark mode
  const toggleMode = () => {
    if (mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(58, 56, 56)';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
    <>
      <Router>
        <Navbar mainTitle="Sole" brandTitle = "Store" mode = {mode} toggleMode = {toggleMode}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='' element={<Home/>} /> 
          <Route path='/home' element={<Home/>} />
          <Route path='/about' element={<About mode = {mode}/>} />
          <Route path='/user' element={<User/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/contact' element={<Contact mode = {mode}  />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/wishlist' element={<Wishlist/>} />
          <Route path='/*' element={<Error404/>} />
        </Routes>
        <Footer mode = {mode}/>
      </Router>
      
    </>
  );
}

export default App;
