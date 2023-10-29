import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ButtonUsage from './SearchBar';


import './Nav.css';


function Nav() {
    let mainReq = 'http://statsapi.mlb.com/api/v1'
    let [players, setPlayers] = useState([]);
    let [teams, setTeams] = useState([]);
    let [results, setResults] = useState([]);
    let [searchBar, setSearchBar] = useState('');
    let [loading, isLoading] = useState(true);

    useEffect(() => {
        getPlayers();
        getTeams();
    }, [])

    function handleChange(e) {
        setSearchBar(e.target.value);
        search(e.target.value)
    }

    async function getPlayers() {
        let allPlayers = [];
        let seen = new Set();
        for (let year = 1920; year <= (new Date().getFullYear()); year++) {
            let list = await axios.get(`${mainReq}/sports/1/players?fields=people,id,fullName,currentTeam&season=${year}`);
            for (let player of list.data.people) {
                if (!(seen.has(player.id))) {
                    allPlayers.push(player);
                    seen.add(player.id);
                    setPlayers(allPlayers);
                }
            }
        }
        setPlayers(allPlayers);
    }

    async function getTeams() {
        let list = await axios.get(`${mainReq}/teams`)
        let res = list.data.teams.filter((team) => {
            return team.sport.id === 1;
        })
        setTeams(res);
    }

    function search(searchVal) {
        setResults([]);
        if (searchVal === '') return;

        let res = [];
        for (let team of teams) {
            if (team.name.toLowerCase().includes(searchVal.toLowerCase())) {
                res.push(team);
            }
        }
        for (let player of players) {
            if (player.fullName.toLowerCase().includes(searchVal.toLowerCase())) {
                res.push(player);
            }
        }
        setResults(res);




    }

    

    return (
        <nav>
            <div className='navLinks'>
                <Link to='/'>Home</Link>
                <Link to='/teams'>Teams</Link>
                <Link to='/games'>Games</Link>
            </div>
            <ButtonUsage/>
            <div className='search-container'>
                <input type="text" placeholder="Search for teams or players." id="searchBar" value={searchBar} onChange={handleChange} />
                <div className='suggestions'>
                    <ul onClick={(e) => {
                        if (e.target.tagName === 'A') {
                            setResults([])
                            setSearchBar('')
                        }
                    }}>
                        {results.slice(0, 10).map((data) => {
                            if (data?.fullName) {
                                return (
                                    <li><Link to={`/player/${data.id}`}>{data.fullName}</Link></li>
                                )
                            }
                            return (
                                <li><Link to={`/team/${data.id}`}>{data.name}</Link></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Nav;