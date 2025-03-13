import React from 'react';
import Hello from './Hello';
import Counter from './Counter';
import NameInput from './NameInput';
import DataFetcher from './DataFetcher';
import ToggleMessage from './ToggleMessage';
import './App.css';

import Home from './pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header title="Personal Website" subtitle="Welcome to my site!"/>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Hello name="world" />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/nameinput" element={<NameInput />} />
          <Route path="/datafetcher" element={<DataFetcher />} />
          <Route path="/togglemessage" element={<ToggleMessage />} />
        </Routes>
      {/* </Router> */}
      {/* <Home /> */}
    </div>
  );
}




export default App;


