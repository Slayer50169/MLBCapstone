import axios from "axios";
import './Teams.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Teams() {
    let mainReq = 'http://statsapi.mlb.com/api/v1/teams'
    let [teams, setTeams] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTeams();
        console.log(teams);
    }, [])

    async function getTeams() {
        setIsLoading(true)
        let teams = await axios.get(mainReq)
        console.log(teams.data)

        let mlbTeams = teams.data.teams.filter((team) => {
            return team.sport.id === 1;
        })

        setTeams([mlbTeams.filter((team) => {
            return team.league.id === 103
        }), mlbTeams.filter((team) => {
            return team.league.id === 104
        })])
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <h1>Loading Teams...</h1>
        )
    }

    return (
        <div className="teams">
            <div className="americanLeague">
                <h2>American League</h2>
                {teams[0].map((team) => {
                    return (
                        <Link to={`/team/${team.id}`} className="teamLink">{team.name}</Link>
                    )
                })}
            </div>
            <div className="nationalLeague">
                <h2>National League</h2>
                {teams[1].map((team) => {
                    return (
                        <Link to={`/team/${team.id}`} className="teamLink">{team.name}</Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Teams;