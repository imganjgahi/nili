import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router,
    Switch,
    Route } from "react-router-dom";
import Home from './Components/Home/Home';
import AboutPage from './Components/AboutPage/AboutPage';

const App = () => {

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/About" component={AboutPage} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    )
}

export default App