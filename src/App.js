import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Provider from './context/Provider/Provider';
import Foods from './pages/Foods/Foods';
import Drinks from './pages/Drinks/Drinks';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/foods/:id" component={ Foods } />
          <Route path="/drinks/:id" component={ Drinks } />
          {/* <Route path="/explore" component={ } />
          <Route path="/explore/foods" component={ } />
          <Route path="/explore/drinks" component={ } />
          <Route path="/explore/foods/ingredients" component={ } />
          <Route path="/explore/drinks/ingredients" component={ } />
          <Route path="/explore/foods/nationalities" component={ } />
          <Route path="/profile" component={ } />
          <Route path="/done-recipes" component={ } />
          <Route path="/favorite-recipes" component={ } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
