import React, { useState, useEffect } from "react";
import Terran from '../assets/icons/T.png'
import Zerg from '../assets/icons/Z.png'
import Protoss from '../assets/icons/P.png'
import { countryCode1, countryCode } from "../modules/countrycodes";

const PlayerDetails = ({ playerid, player_data }) => {

  const [example, setExample] = useState([]);
  let [loading, setLoading] = useState(true);

  const url = async () => {
    // const response = await fetch("http://aligulac.com/api/v1/player/?apikey=DFwWEKaprPJIMgYBcWp2&format=json/&id__iexact=" + playerid)
    // const response = await fetch("https://api.esportsearnings.com/v0/LookupPlayerById?apikey=ce7ed365411cc853d8184a2fc6aa22b1fdc34eb9b300db3d47204a1a024d573f&playerid=5513")
    // setExample(await response.json())
    setLoading(false)
  }

  useEffect(() => {
    url()
    }, [])

  let name = example.NameFirst + example.NameSecond

  if (loading) return null
 

  // let race = [Terran, ' Terran']
  // if (example.objects[0].race === 'Z'){
  //   race = [Zerg, ' Zerg']
  // } else if(example.objects[0].race === 'P') {
  //   race = [Protoss, ' Protoss']
  // }

  let race = Terran
  if (player_data.player_race === 'Zerg'){
    race = Zerg
  } else if(player_data.player_race === 'Protoss') {
    race = Protoss
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  
  return (

      <tbody>
        {/* <tr>
          <td className="td-left-col">Race</td>
          <td><img src={race[0]}/>{race[1]}</td>
        </tr>
        <tr>
          <td className="td-left-col">Country</td>
          <td><img src={`https://flagcdn.com/16x12/${example.objects[0].country.toLowerCase()}.png`}></img>
          &nbsp;
          {countryCode1(example.objects[0].country)}</td>
        </tr>
        <tr>
          <td className="td-left-col">Full name	</td>
          <td>{example.objects[0].name}</td>
        </tr>
        <tr>
          <td className="td-left-col">Birthday</td>
          <td>{example.objects[0].birthday}</td>
        </tr>
        <tr>
          <td className="td-left-col">Team</td>
          <td>{example.objects[0].current_teams[0].team.name}</td>
        </tr> 
        <tr>
          <td className="td-left-col">Total earnings</td>
          <td>{formatter.format(example.objects[0].total_earnings)}</td> 
        </tr>
        */}


        <tr>
          <td className="td-left-col">Race</td>
          <td><img src={race}/> {player_data.player_race}</td>
        </tr>
        <tr>
          <td className="td-left-col">Country</td>
          <td>
            <img src={`https://flagcdn.com/16x12/${countryCode( player_data.player_country )}.png`}></img>
            &nbsp;
            {player_data.player_country}
          </td>
        </tr>
        <tr>
          <td className="td-left-col">Full name	</td>
          <td>{player_data.player_full_name}</td>
        </tr>
        <tr>
          <td className="td-left-col">Birthday</td>
          <td>{player_data.birthday}</td>
        </tr>
        <tr>
          <td className="td-left-col">Team</td>
          <td>{player_data.team}</td>
        </tr> 
        <tr>
          <td className="td-left-col">Total earnings</td>
          <td>{formatter.format(player_data.total_earnings)}</td> 
        </tr>

      </tbody>
      

  )
}

export default PlayerDetails