import React from 'react';
import SelectCity from './components/select-city/select-city';
import './App.css';

function App() {

  return (
    <div className="App">
      <header>
        <h1>
          Pick your favorite city
        </h1>        
      </header>
      <main>
        <SelectCity />
      </main>
    </div>
  );
}

export default App;
