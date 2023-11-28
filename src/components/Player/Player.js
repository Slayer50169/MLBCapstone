import axios from "axios";
import NotFound from "../NotFound/NotFound";
import PlayerStats from "../PlayerStats/PlayerStats";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Parallax } from "react-parallax";

function Player() {
    let { id } = useParams();
    let [playerData, setPlayerData] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let mainReq = 'https://statsapi.mlb.com/api/v1/people/'


    useEffect(() => {
        getPlayerData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);



    async function getPlayerData() {
        setIsLoading(true)
        let player = await axios.get(mainReq + id + '?hydrate=,currentTeam').catch(() => {
            return;
        });
        if (!player) {
            setIsLoading(false);
            setPlayerData(null)
            return;
        }
        setPlayerData(player.data.people[0]);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (!playerData) return <NotFound />;

    return (
        <Parallax className='parallax' strength={1000} bgImage={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/${playerData.id}/action/hero/current`}>
            <div className="player card text-light bg-dark-subtle mt-5 mx-auto col-6 col-sm-4 col-md-2" >
                <div className="card-body">
                    <img className="card-img-top" id='headshot' style={{ 'max-width': '100%' }} src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerData.id}/headshot/67/current`} alt={playerData.fullName} title={playerData.fullName} />
                    <h4 className="card-title">{playerData.fullName}</h4>
                </div>
            </div>
            <div className="card bg-dark-subtle mx-auto mt-5 col-10 col-sm-4">
                <h3 className="card-title">About</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-dark-subtle">#{playerData.primaryNumber}</li>
                    <li className="list-group-item bg-dark-subtle">{playerData.primaryPosition.name}</li>
                    <li className="list-group-item bg-dark-subtle">Age: {playerData.currentAge}</li>
                    <li className="list-group-item bg-dark-subtle">Height: {playerData.height}</li>
                    <li className="list-group-item bg-dark-subtle">Weighs: {playerData.weight} Lbs</li>
                    <li className="list-group-item bg-dark-subtle">Born: {playerData.birthDate}</li>
                    <li className="list-group-item bg-dark-subtle">Debut: {playerData.mlbDebutDate}</li>
                    <li className="list-group-item bg-dark-subtle">From: {playerData.birthCountry}</li>
                    <li className="list-group-item bg-dark-subtle">B/T: {playerData.batSide.code}/{playerData.pitchHand.code}</li>
                    <li className="list-group-item bg-dark-subtle">Plays for: <Link to={`/team/${playerData.currentTeam.id}`}>{playerData.currentTeam.name}</Link></li>
                </ul>
            </div>
            <PlayerStats id={id} />
        </Parallax>


    )
}

export default Player;