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
        console.log(teamData);
    }, [id])

    async function getTeamData() {
        setIsLoading(true);
        let data = await axios.get(mainReq + id);
        setTeamData(data.data.teams[0]);
        getRoster();
        setIsLoading(false);
    }

    async function getRoster() {
        let roster = await axios.get(mainReq + id + '/roster');
        console.log(roster)
        setRoster(roster.data.roster);
    }

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div className="team">
            <img id='teamLogo' src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${teamData.id}.svg`} width={200} alt={teamData.name + ' logo'} title={teamData.name + ' logo'} />
            <br />
            <p>{teamData.name}</p>
            <p>Home Park: {teamData.venue.name}</p>
            <p>First Played in {teamData.firstYearOfPlay}</p>
            <div className="teamStaff">
                <h3>Team Roster</h3>
                <table>
                    <tbody>
                        <tr id="headers">
                            <td>#</td>
                            <td>Name</td>
                            <td>Position</td>
                        </tr>
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
            </div>
        </div>
    )
}

export default Team;