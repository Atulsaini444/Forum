import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux-toolkit/Store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">Boilerplate code for react,typescript and redux-toolkit</div>
    </Provider>
  );
}

export default App;
