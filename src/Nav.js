import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
    let mainReq = 'http://statsapi.mlb.com/api/v1'
    let [players, setPlayers] = useState();
    let [teams, setTeams] = useState();
    let [results, setResults] = useState([]);
    let [searchBar, setSearchBar] = useState('');

    useEffect(() => {
        getPlayers();
        getTeams();
    }, [])

    function handleChange(e) {
        setSearchBar(e.target.value);
        search(e.target.value)
    }

    async function getPlayers() {
        let list = await axios.get(`${mainReq}/sports/1/players?fields=people,id,fullName,currentTeam`);
        setPlayers(list.data);
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
        for (let player of players.people) {
            if (player.fullName.toLowerCase().includes(searchVal.toLowerCase())) {
                res.push(player);
            }
        }
        setResults(res);




    }

    return (
        <nav>
            <Link to='/'>Home</Link>
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