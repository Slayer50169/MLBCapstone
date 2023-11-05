import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './Team.css'

function Team() {
    let { id } = useParams();
    let [roster, setRoster] = useState([]);
    let [teamData, setTeamData] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let mainReq = 'http://statsapi.mlb.com/api/v1/teams/'

    useEffect(() => {
        getTeamData();
    }, [id])

    async function getTeamData() {
        //Requests data for the team
        setIsLoading(true);
        let data = await axios.get(mainReq + id);
        setTeamData(data.data.teams[0]);
        getRoster();
        setIsLoading(false);
    }

    async function getRoster() {
        //Requests data for the teams roster
        let roster = await axios.get(mainReq + id + '/roster');
        setRoster(roster.data.roster);
        console.log(roster)
    }

    function getRosterTable() {
        return  roster ? (
            <table className="table table-striped">
                <thead>
                    <tr className="table-dark">
                        <th scope="col" className="col-4">#</th>
                        <th scope="col" className="col-4">Name</th>
                        <th scope="col" className="col-4">Position</th>
                    </tr>
                </thead>
                <tbody>
                    {roster.map((person) => {
                        return (
                            <tr>
                                <td>{person.jerseyNumber}</td>
                                <td><Link to={`/player/${person.person.id}`}>{person.person.fullName}</Link></td>
                                <td>{person.position.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        ) : <h5>No roster available.</h5>
    }

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div className="container-fluid bg-dark-subtle pb-1">
            {<img id='teamLogo' src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${teamData.id}.svg`} alt={teamData.name + ' logo'} onError={(e) => e.target.style.display = 'none'} title={teamData.name + ' logo'} /> ?? null}
            <br />
            <p>{teamData.name}</p>
            <p>Home Park: {teamData.venue.name}</p>
            <p>First Played in {teamData.firstYearOfPlay}</p>
            <div className="teamStaff container">
                <h3>Team Roster</h3>
                {getRosterTable()}
            </div>
        </div>
    )
}

export default Team;