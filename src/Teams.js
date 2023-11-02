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
        <div className="container-fluid text-center">
            <h2>Teams</h2>
            <div className="row justify-content-around">
                <div className="americanLeague card bg-dark text-light col-4">
                    <div className="card-body">
                        <h2 className="card-title">American League</h2>
                    </div>
                    <ul className="list-group list-group-flush bg-dark text-light">
                        {teams[0].map((team) => {
                            return (
                                <li className="list-group-item bg-dark"><Link to={`/team/${team.id}`} className="btn btn-dark">{team.name}</Link></li>
                            )
                        })}
                    </ul>

                </div>
                <div className="nationalLeague card bg-dark text-light col-4">
                    <div className="card-body">
                        <h2 className="card-title">National League</h2>
                    </div>
                    <ul className="list-group list-group-flush">
                        {teams[1].map((team) => {
                            return (
                                <li className="list-group-item bg-dark"><Link to={`/team/${team.id}`} className="btn btn-dark">{team.name}</Link></li>
                            )
                        })}
                    </ul>

                </div>
            </div>

        </div>
    )
}

export default Teams;