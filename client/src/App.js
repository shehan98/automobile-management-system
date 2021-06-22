import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages.component'
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />

        </div>
      </Router>
    </DataProvider>
    
  );
}

export default App;
