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
        <div className="bg-dark-subtle pb-1">
            <div className="player bg-dark text-light">
                <img className="img-responsive" id='headshot' src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerData.id}/headshot/67/current`} alt={playerData.fullName} title={playerData.fullName} />
                <img id='hero' src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/${playerData.id}/action/hero/current`} alt={playerData.fullName} title={playerData.fullName} />
                <br />
                <div className="d-flex p-2 pl-3 m-0">
                    <p className="fw-bold fs-2">{playerData.fullName}</p>
                    <p className="fs-6 p-3 m-0">#{playerData.primaryNumber}</p>
                    <p className="fs-6 p-3 m-0">{playerData.primaryPosition.name}</p>
                    <p className="fs-6 p-3 m-0">Age: {playerData.currentAge}</p>
                    <p className="fs-6 p-3 m-0">Height: {playerData.height}</p>
                    <p className="fs-6 p-3 m-0">Weighs: {playerData.weight} Lbs</p>
                    <p className="fs-6 p-3 m-0">Born: {playerData.birthDate}</p>
                    <p className="fs-6 p-3 m-0">Debut: {playerData.mlbDebutDate}</p>
                    <p className="fs-6 p-3 m-0">From: {playerData.birthCountry}</p>
                    <p className="fs-6 p-3 m-0">B/T: {playerData.batSide.code}/{playerData.pitchHand.code}</p>
                    <p className="fs-6 p-3 m-0">Plays for: <Link to={`/team/${playerData.currentTeam.id}`}>{playerData.currentTeam.name}</Link></p>
                </div>


            </div>
            <div className="container-fluid bg-dark-subtle">
                <PlayerStats id={id} />
            </div>

        </div>

    )
}

export default Player;