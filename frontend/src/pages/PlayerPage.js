import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerHistory from "../components/PlayerHistory";
import Chart from "../components/Chart";
import PlayerName from "../components/PlayerName";
import PlayerDetails from "../components/PlayerDetails";
import { TabTitle } from "../modules/TabTitle";

const PlayerPage = () => {

  const { id } = useParams();
  let [matchHistory, setMatchHistory] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getmatchHistory();
  }, [id]);

  let getmatchHistory = async () => {
    let response = await fetch("/api/match_history/" + id);
    let data = await response.json();
    setMatchHistory(data);
    setLoading(false)
  };

  if (loading) return 
    <p></p>
  
  // Set tab title to players nametag:
  let titleName = ''
  if (matchHistory[0].player_a.id == id){
    titleName = matchHistory[0].player_a.player_name
  } else {
    titleName = matchHistory[0].player_b.player_name
  }

  // Get player profile name:
  let player_data = ''
  if (matchHistory[0].player_a.id === Number(id)) {
    player_data = matchHistory[0].player_a
  } else {
    player_data = matchHistory[0].player_b
  }
  

  TabTitle(titleName)

  return (
    <div> 

      <PlayerName match={matchHistory} ID={id} />

    
      <div className="row">
        <div style={{ width: 700, float: 'left' }} className="">
          <Chart chartdata={matchHistory} ID={id} />
        </div>

        <div style={{float: 'left', width: '250px'}} key={player_data.aligulac_id}>

          <table style={{width: '250px'}}>
            <thead>
              <tr style={{textAlign: 'center', borderTopWidth: 0, bgcolor: 'black'}}>
                <th colSpan={2}>Details</th>
              </tr>
            </thead>
            <PlayerDetails playerid={player_data.aligulac_id} player_data={player_data}/>
          </table>

        </div>
      </div>
      
      <div className="row">
        <div className="results">
          <h2 className="h2-2">R<span className="h2-title-2">ESULTS </span></h2>
          <div className="match-data-titles">
            <div>Date</div>
            <div>Rating</div>
            <div className="right-column">Player A</div>
            <div style={{marginLeft: 'auto', marginRight: 'auto'}}>Score</div>
            <div>Player B</div>
            <div>Rating</div>
            <div title='Best of'>Bo</div>
          </div>

          {matchHistory.map((match, index) => (
            <PlayerHistory key={index} match={match} />
          ))}
          
        </div>
      </div>
    </div> 
  )
}

export default PlayerPage;