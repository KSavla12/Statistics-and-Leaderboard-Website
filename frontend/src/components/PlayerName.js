import React from 'react'
import {countryCode} from '../modules/countrycodes'
import Terran from '../assets/icons/t1.png'
import Zerg from '../assets/icons/z1.png'
import Protoss from '../assets/icons/p1.png'

const PlayerName = ({ match, ID }) => {
  let playerData = ''

  if (match[0].player_a.id === Number(ID)) {
    playerData = match[0].player_a
  } else {
    playerData = match[0].player_b
  }

  let race = <img src={Terran} width={28} height={'auto'}/>
  if (playerData.player_race === 'Zerg'){
    race = <img src={Zerg} width={28} height={'auto'}/>
  } else if(playerData.player_race === 'Protoss') {
    race = <img src={Protoss} width={30} height={'auto'}/>
  }

  return (
    <div className='results1'>
      <h2>{playerData.player_name.slice(0,1)}<span className="h2-title">{playerData.player_name.slice(1,20)}</span></h2>
      {/* <img src={`https://flagcdn.com/32x24/${countryCode( playerData.player_country )}.png`}
        alt={countryCode( playerData.player_country )}></img> */}
     
      {race}
      
    </div>
  )
}

export default PlayerName