import axios from "axios";
import './Teams.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Teams() {
    let mainReq = 'https://statsapi.mlb.com/api/v1/teams?sportId=1'
    let [teams, setTeams] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTeams();
    }, [])

    async function getTeams() {
        //Gets all teams and then seperates them by National League and American League
        setIsLoading(true)
        let teams = await (await axios.get(mainReq)).data.teams

        setTeams([teams.filter((team) => {
            return team.league.id === 103
        }), teams.filter((team) => {
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
            
            <div className="row justify-content-center">
                <div className="card text-bg-dark col-4 m-5">
                    <div className="card-body">
                        <h2 className="card-title">Teams</h2>
                        <p className="card-body">Find your favorite MLB teams here! Other baseball teams such as minor leagues can be found on player profiles</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-around">
                <div className="americanLeague card text-bg-dark col-5">
                    <div className="card-body">
                        <h2 className="card-title">American League</h2>
                    </div>
                    <ul className="list-group list-group-flush">
                        {teams[0].map((team) => {
                            return (
                                <li className="list-group-item bg-dark">
                                    <Link to={`/team/${team.id}`} className="btn btn-dark w-100 p-3 m-0">
                                        <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${team.id}.svg`}/>
                                        <br/>
                                        {team.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className="nationalLeague card text-bg-dark col-5">
                    <div className="card-body">
                        <h2 className="card-title">National League</h2>
                    </div>
                    <ul className="list-group list-group-flush">
                        {teams[1].map((team) => {
                            return (
                                <li className="list-group-item bg-dark">
                                    <Link to={`/team/${team.id}`} className="btn btn-dark w-100 p-3 m-0">
                                        <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${team.id}.svg`}/>
                                        <br/>
                                        {team.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>

        </div>
    )
}

export default Teams;