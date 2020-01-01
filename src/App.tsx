import React from 'react';
import Login from './Components/Auth/Login';
import Navbar from './Components/Navbar/Navbar';

const App = () => {

    return (
        <div className="App"> 
            <Navbar />
            <Login />
        </div>
    )
}

export default App