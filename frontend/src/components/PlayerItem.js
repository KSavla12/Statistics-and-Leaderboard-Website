import React from 'react'
import { Link } from "react-router-dom";
import {countryCode} from '../modules/countrycodes'
import Terran from '../assets/icons/T.png'
import Zerg from '../assets/icons/Z.png'
import Protoss from '../assets/icons/P.png'

const PlayerItem = ({ player, number }) => {

  let race = Terran
  if (player.player_race === 'Zerg'){
    race = Zerg
  } else if(player.player_race === 'Protoss') {
    race = Protoss
  }

  return (
    <div className="player-data">
      <div>{ number + 1 }</div>
      <div>
        <img
        src={`https://flagcdn.com/16x12/${countryCode( player.player_country )}.png`}
        srcSet={`https://flagcdn.com/32x24/${countryCode( player.player_country )}.png 2x,
          https://flagcdn.com/48x36/${countryCode( player.player_country )}.png 3x`}
        alt={countryCode( player.player_country )}></img>
      </div>
      <div>
        <img src={race} alt={player.player_race} />
      </div>
      <div>
        <p>
          <Link style={{ color: '#3F70C8'}} to={`/player/${player.id}`}> 
            { player.player_name }
          </Link>
        </p>
      </div>
      <div>{ player.rating }</div>
      <div>{ player.rating_v_p }</div>
      <div>{ player.rating_v_t }</div>
      <div>{ player.rating_v_z }</div>
    </div>

  )
}

export default PlayerItem