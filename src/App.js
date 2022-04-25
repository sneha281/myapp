
import './App.css';
import React from "react";


import NavBar from './components/NavBar'
import About from './components/About';
import Home from './components/Home';
import { Router , Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        
       
       <Router>
        <NavBar/>
       
         <Route path='/welcome' element={<Home/>} />
            
         
         <Route path='/welcome' element={<About/>} />
         
        
       </Router>
    
    </div>
      
  
  );
}

export default App;
