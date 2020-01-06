import React, { useState } from 'react';
import logo from './logo.svg';

import { connect } from 'react-redux';
import {useSelector} from 'react-redux';
import store from './store';
function App() {
  const counter = useSelector(state => state.counter);

  const isLogged = useSelector(state => state.isLogged);
  const [error, setError] = useState(false);
  return (
    <div className="App">
      <div className="Counter">
        <h1>Counter:{counter}</h1>
        <button onClick={e=>errorCheck('increment')}>+</button>
        <button onClick={e=>errorCheck('decrement')}>-</button>
        {error?<h1>"Counter should be greater than 0"</h1>:''}
      </div>
      <div className="logged">
        <p>{isLogged}</p>
        <h1>isLogged: {isLogged}</h1>
        {isLogged ? <h1>Yes login</h1> : ''}
        <button onClick={e=> window.store.dispatch({type:'SIGN_IN'})}>Toggle Signin</button>
      </div>
    </div>
  );
  function errorCheck(action) {
    if (counter ==0) {
      if (action == 'decrement')
      { setError(true); }
      else
      {
        setError(false);
        window.store.dispatch({ type: action });
        }
    }
    else
    {
      setError(false);
      window.store.dispatch({ type: action });
    }

  }
}



export default connect(state => state)(App)
