import React from 'react'
import './App.css'
import example from './assets/example.jpg'
import TechList from './components/TechList'


function App() {
    return (
        <h1>
           Hello Samychan 
           <img src={example}/>
           <TechList />
        </h1>
    )
}

export default App;
