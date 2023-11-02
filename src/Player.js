import axios from "axios";
import './Player.css'
import PlayerStats from "./PlayerStats";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Player() {
    let { id } = useParams();
    let [playerData, setPlayerData] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let mainReq = 'http://statsapi.mlb.com/api/v1/people/'


    useEffect(() => {
        getPlayerData();
    }, [id]);



    async function getPlayerData() {
        setIsLoading(true)
        let player = await axios.get(mainReq + id + '?hydrate=,currentTeam');
        setPlayerData(player.data.people[0]);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <div className="player">
                <img id='headshot' src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerData.id}/headshot/67/current`} alt={playerData.fullName} title={playerData.fullName} />
                <img id='hero' src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/${playerData.id}/action/hero/current`} alt={playerData.fullName} title={playerData.fullName} />
                <br />
                <p id="name">{playerData.fullName}</p>
                <p>#{playerData.primaryNumber}</p>
                <p>{playerData.primaryPosition.name}</p>
                <p>Age: {playerData.currentAge}</p>
                <p>Height: {playerData.height}</p>
                <p>Weighs: {playerData.weight} Lbs</p>
                <p>Born: {playerData.birthDate}</p>
                <p>Debut: {playerData.mlbDebutDate}</p>
                <p>From: {playerData.birthCountry}</p>
                <p>B/T: {playerData.batSide.code}/{playerData.pitchHand.code}</p>
                <p>Plays for: <Link to={`/team/${playerData.currentTeam.id}`}>{playerData.currentTeam.name}</Link></p>
                <hr />
            </div>
            <div className="container-fluid">
                <PlayerStats id={id} />
            </div>

        </>

    )
}

export default Player;