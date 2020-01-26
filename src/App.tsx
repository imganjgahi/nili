import React from 'react';
import Login from './Components/Auth/Login';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router,
    Switch,
    Route } from "react-router-dom";

const App = () => {

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={Login} />
                </Switch>
            </Router>
        </div>
    )
}

export default App