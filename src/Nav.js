import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ButtonUsage from './SearchBar';


import './Nav.css';
import { useTheme } from '@emotion/react';
import bootstrap from 'bootstrap';


function Nav() {
    const theme = useTheme();
    let mainReq = 'http://statsapi.mlb.com/api/v1'
    let [players, setPlayers] = useState([]);
    let [teams, setTeams] = useState([]);
    let [results, setResults] = useState([]);
    let [searchBar, setSearchBar] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [])

    function getData() {
        setIsLoading(true);
        getPlayers();
        getTeams();
        setIsLoading(false);
    }

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
        <nav className='center navbar navbar-expand-lg navbar-dark bg-dark'>
            <div>
                <ul className='navbar-nav mr-auto'>
                    <Link className='nav-link' to='/'>Home</Link>
                    <Link className='nav-link' to='/teams'>Teams</Link>
                    <Link className='nav-link' to='/games'>Games</Link>
                    {isLoading ? <p>Loading...</p> : <ButtonUsage players={players} teams={teams} />}
                </ul>

                
            </div>
        </nav>

    )
}

export default Nav;