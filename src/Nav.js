import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Nav() {
    let mainReq = 'https://statsapi.mlb.com/api/v1'
    let [players, setPlayers] = useState([]);
    let [teams, setTeams] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getData() {
        // Calls functions to get data for teams and players
        getPlayers();
        getTeams();
    }


    async function getPlayers() {
        // Gets players from the API starting from the beginning year to current year
        let allPlayers = [];
        let seen = new Set();
        for (let year = 1920; year <= (new Date().getFullYear()); year++) {
            let list = await axios.get(`${mainReq}/sports/1/players?fields=people,id,fullName,currentTeam&season=${year}`);
            for (let player of list.data.people) {
                if (!(seen.has(player.fullName))) {
                    allPlayers.push(player);
                    seen.add(player.fullName);
                    setPlayers(allPlayers);
                }
            }
        }
        setPlayers(allPlayers);
    }

    async function getTeams() {
        // Gets current teams
        let list = await axios.get(`${mainReq}/teams`)
        let res = list.data.teams.filter((team) => {
            return team.sport.id === 1;
        })
        setTeams(res);
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark p-2' data-bs-theme="dark">
            <Link to='/' className='navbar-brand'>MLB Stats</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                    <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
                    <li className='nav-item'><Link className='nav-link' to='/teams'>Teams</Link></li>
                    <li className='nav-item'><Link className='nav-link' to='/games'>Games</Link></li>
                    <li className='nav-item search-container pb-5 pb-lg-0'><SearchBar players={players} teams={teams} /></li>
                </ul>
            </div>
        </nav>

    )
}

export default Nav;