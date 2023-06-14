import React, {useState, useEffect} from 'react'
import PlayerItem from '../components/PlayerItem'
import { TabTitle } from '../modules/TabTitle'

// Filter players:
const getFilteredItems = (query, items) => {
  TabTitle('Rankings')

  if (!query) {
    return items
  }
  return items.filter(playere => playere.player_race.includes(query.race) && playere.player_country.includes(query.country))
}


const PlayerRankings = () => {

  let [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers()
  }, []);

  let getPlayers = async () => {
    let response = await fetch('/api/players/')
    let data = await response.json()
    setPlayers(data)
  };

  // Filter players:
  const [query, setQuery] = useState({
    race: "",
    country: ""
  });

  const filteredItems = getFilteredItems(query, players)

  // Get list of all countries:
  const countryList = [...new Set(players.map(item => item.player_country))];
  

  return (
    <div>

      <div className="top-10">
        <h2>R<span className="h2-title">ANKINGS </span></h2>

        <div className="player-data-titles-filter">
          <div className="options_rows">
            <form className="d-flex">

            <select onChange={event => setQuery(prevNote => {
              return {
                ...prevNote,
                race:event.target.value
              };
            })}>
              <option value=''>Race</option>
              <option value='Terran'>Terran</option>
              <option value='Zerg'>Zerg</option>
              <option value='Protoss'>Protoss</option>
            </select>

            <select onChange={event => setQuery(prevNote => {
              return {
                ...prevNote,
                country:event.target.value
              };
            })}>
              <option value=''>Country</option>
              {countryList.map((country, index) => (
                <option value={country} key={index}>{country}</option>
              ))}
            </select> 

            </form>
          </div>
        </div>


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

        {filteredItems.map((player, index) => (
          <PlayerItem key={index} player={player} number={index} />
        ))}

      </div>
    </div>
  )
}

export default PlayerRankings