import React from 'react'
import { Link } from "react-router-dom";
import {countryCode} from '../modules/countrycodes'
import Terran from '../assets/icons/T.png'
import Zerg from '../assets/icons/Z.png'
import Protoss from '../assets/icons/P.png'


const PlayerHistory = ({ match }) => {

  let raceA = Terran
  if (match.player_a.player_race === 'Zerg'){
    raceA = Zerg
  } else if(match.player_a.player_race === 'Protoss') {
    raceA = Protoss
  }

  let raceB = Terran
  if (match.player_b.player_race === 'Zerg'){
    raceB = Zerg
  } else if(match.player_b.player_race === 'Protoss') {
    raceB = Protoss
  }

  let total_score = Math.max(match.player_a_score, match.player_b_score)
  let bestOf = 1
  if (total_score === 1) {
    bestOf = 1
  } else if(total_score === 2) {
    bestOf = 3
  } else if(total_score === 3) {
    bestOf = 5
  } else if(total_score === 4) {
    bestOf = 7
  } else if(total_score === 5) {
    bestOf = 9
  } 

  let winner = 'player_a'
  if (match.player_a_score < match.player_b_score){
    winner = 'player_b'
  }


  return (
    
    <div className="match-data">

      <div>
        { match.date }
      </div>
      <div>
        { match.player_a_rating }
      </div>
      <div className="right-column">
        <Link style={{ color: '#3F70C8', fontWeight: winner === 'player_a' ? 'bold' : null }} to={`/player/${match.player_a.id}`}>
          { match.player_a.player_name }
        </Link>
        &nbsp; &nbsp; 
        <img src={`https://flagcdn.com/16x12/${countryCode( match.player_a.player_country )}.png`}
        srcSet={`https://flagcdn.com/32x24/${countryCode( match.player_a.player_country )}.png 2x,
          https://flagcdn.com/48x36/${countryCode( match.player_a.player_country )}.png 3x`}
        alt={countryCode( match.player_a.player_country )}></img>
        &nbsp; &nbsp;
        <img src={raceA} alt={''} />

      </div>

      <div style={{marginLeft: 'auto', marginRight: 'auto', winner}}>{ match.player_a_score } - { match.player_b_score }</div>

      <div>
        <img src={raceB} alt={''} />
        &nbsp; &nbsp;
        <img src={`https://flagcdn.com/16x12/${countryCode( match.player_b.player_country )}.png`}
        srcSet={`https://flagcdn.com/32x24/${countryCode( match.player_b.player_country )}.png 2x,
          https://flagcdn.com/48x36/${countryCode( match.player_b.player_country )}.png 3x`}
        alt={countryCode( match.player_b.player_country )}></img>
        &nbsp; &nbsp;
        <Link style={{ color: '#3F70C8', fontWeight: winner === 'player_b' ? 'bold' : null}} to={`/player/${match.player_b.id}`}> 
          { match.player_b.player_name }
        </Link>
      </div>
      <div>{ match.player_b_rating }</div>

      <div>{ bestOf }</div>
    </div>

  )
}

export default PlayerHistory