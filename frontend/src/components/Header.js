import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="title">
        <Link to={`/`} >
          <div>
            <h1>ALIGULAC</h1>
          </div>
        </Link>
        <div className="sub-title">
          <p>StarCraft 2 Progaming Statistics and Predictions</p>
        </div>
      </div>

      <div className="nav-bar">
        <Link to={`/player/ranking`} >
          <div className="nav-content">
            Ranking 
          </div>
        </Link>
        <Link to={`/player/ranking`} >
          <div className="nav-content">
            Search 
          </div>
        </Link>
        <div className="nav-content">
          Records
        </div>
        <div className="nav-content">
          Results
        </div>
        <div className="nav-content">
          Inference
        </div>
        <div className="nav-content">
          Misc
        </div>
        <div className="nav-content">
          About
        </div>
        <a href="https://aligulac.herokuapp.com/admin" target="_blank" style={{textDecoration:'none', color:'rgb(128, 128, 128)'}}>
          <div className="nav-content">
            Submit
          </div>
        </a>
      </div>
    </div>
  )
}

export default Header