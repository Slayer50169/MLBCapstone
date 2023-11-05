import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


import './Nav.css';
import { useTheme } from '@emotion/react';



function Nav() {
    let mainReq = 'http://statsapi.mlb.com/api/v1'
    let [players, setPlayers] = useState([]);
    let [teams, setTeams] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [])

    function getData() {
        // Calls functions to get data for teams and players
        setIsLoading(true);
        getPlayers();
        getTeams();
        setIsLoading(false);
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
        <nav className='navbar navbar-expand-lg bg-dark sticky-top' data-bs-theme="dark">
            <div>
                <div className='container-fluid'>
                    <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/teams'>Teams</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/games'>Games</Link></li>
                        {isLoading ? <p>Loading...</p> : <SearchBar players={players} teams={teams} />}
                    </ul>
                    </div>
                    
                </div>
            </div>
        </nav>

    )
}

export default Nav;