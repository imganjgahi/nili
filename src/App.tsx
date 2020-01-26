import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router,
    Switch,
    Route } from "react-router-dom";
import Home from './Components/Home/Home';

const App = () => {

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    )
}

export default App