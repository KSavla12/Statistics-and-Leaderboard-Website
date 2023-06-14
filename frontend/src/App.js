import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './css/base.css';
import './css/search.css';
import Header from './components/Header';
import TopTenPage from './pages/TopTenPage';
import PlayerPage from './pages/PlayerPage';
import PlayerRankings from "./pages/PlayerRankings";
import DarkMode from "./components/DarkMode";
import Footer from "./components/Footer";

function App() {

  return (
    <Router>
      <div className="App">
        <DarkMode />
        <Header/>
        <Routes> 
          <Route path="/" exact element={<TopTenPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/player/ranking" element={<PlayerRankings />} />
        </Routes> 
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
