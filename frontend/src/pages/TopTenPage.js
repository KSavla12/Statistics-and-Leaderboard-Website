import React, {useState, useEffect} from 'react'
import PlayerItem from '../components/PlayerItem'
import { TabTitle } from '../modules/TabTitle'

const TopTenPage = () => {
  TabTitle('Aligulac')

  let [players, setPlayers] = useState([])

  useEffect(() => {
    getPlayers()
  }, [])

  let getPlayers = async () => {
    let response = await fetch('/api/players/')
    let data = await response.json()
    setPlayers(data)
  }
  
  return (
    <div>
      <div className="top-10">
      <h2>C<span className="h2-title">URRENT TOP </span>10</h2>
        <div className="player-data-titles">
          <div>#</div>
          <div></div>
          <div></div>
          <div>Name</div>
          <div>Rating</div>
          <div>vP</div>
          <div>vT</div>
          <div>vZ</div>
        </div>
   
        {players.slice(0,10).map((player, index) => (
          <PlayerItem key={index} player={player} number={index} />
        ))}
      </div>
    </div>
  )
}

export default TopTenPage