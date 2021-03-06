import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import Home from './page/Home'

const App = () => (
    <Router>
        <div className="App">
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    </Router>
)

export default App;