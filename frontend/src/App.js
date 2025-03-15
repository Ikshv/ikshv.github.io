import React from 'react';
import Hello from './Hello';
import Counter from './Counter';
import NameInput from './NameInput';
import DataFetcher from './DataFetcher';
import ToggleMessage from './ToggleMessage';
import './App.css';

import Home from './pages/Home';
import Projects from './pages/Projects'
import Header from './components/Header';
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WebcamLandmarks from './pages/WebcamPage';
import FaceLandmarkerComponent from './components/FaceLandmarkerComponent'

function App() {
  return (
    <div className="App">
      <Header title="Personal Website" subtitle="Welcome to my site!"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello name="world" />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/nameinput" element={<NameInput />} />
        <Route path="/datafetcher" element={<DataFetcher />} />
        <Route path="/togglemessage" element={<ToggleMessage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/webcam" element={<WebcamLandmarks />} />
        <Route path="/webcam2" element={<FaceLandmarkerComponent />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;


