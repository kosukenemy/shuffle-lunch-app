import React from 'react';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import Home from './Page/Home';
import UserPage from './Page/UserPage';



function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/userPage/:id" component={UserPage} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
