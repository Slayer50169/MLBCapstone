import axios from "axios";
import './PlayerStats.css'
import { useState, useEffect } from "react";



function PlayerStats({ id }) {
    let [playerStats, setPlayerStats] = useState({});
    let [statType, setStatType] = useState('hitting');
    let [isLoading, setIsLoading] = useState(true);
    let mainReq = 'http://statsapi.mlb.com/api/v1/people/'

    useEffect(() => {
        getStats(statType);
    }, [statType]);

    async function getStats(type) {
        setIsLoading(true);
        let yearByYear = await axios.get(`${mainReq}${id}?hydrate=stats(group=[${type}],type=yearByYear,sportId=1),currentTeam`);
        let stats = await axios.get(`${mainReq}${id}?hydrate=stats(group=[${type}],type=career,sportId=1),currentTeam`)
        if (stats.data.people[0]?.stats) {
            setPlayerStats([stats.data.people[0].stats[0].splits[0].stat, yearByYear.data.people[0].stats[0].splits]);
            setStatType(type);
        } else {
            setPlayerStats(undefined);
            setStatType(type);
        }

        setIsLoading(false);
    }

    function getTable() {
        if (!playerStats) {
            return (
                <h4>No stats available.</h4>
            )
        }

        if (statType === 'hitting') {
            return (
                <table className="statTable table table-striped">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col" className='col-1'>Season</th>
                            <th scope="col" className='col-1'>Games Played</th>
                            <th scope="col" className='col-1'>Plate Appearances</th>
                            <th scope="col" className='col-1'>AB</th>
                            <th scope="col" className='col-1'>H</th>
                            <th scope="col" className='col-1'>2B</th>
                            <th scope="col" className='col-1'>3B</th>
                            <th scope="col" className='col-1'>HR</th>
                            <th scope="col" className='col-1'>Ground Outs</th>
                            <th scope="col" className='col-1'>Fly Outs</th>
                            <th scope="col" className='col-1'>SO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerStats[1].map((stat) => {
                            return (
                                <tr>
                                    <td>{stat.season ?? '-'}</td>
                                    <td>{stat.stat.gamesPlayed ?? '-'}</td>
                                    <td>{stat.stat.plateAppearances ?? '-'}</td>
                                    <td>{stat.stat.atBats ?? '-'}</td>
                                    <td>{stat.stat.hits ?? '-'}</td>
                                    <td>{stat.stat.doubles ?? '-'}</td>
                                    <td>{stat.stat.triples ?? '-'}</td>
                                    <td>{stat.stat.homeRuns ?? '-'}</td>
                                    <td>{stat.stat.groundOuts ?? '-'}</td>
                                    <td>{stat.stat.airOuts ?? '-'}</td>
                                    <td>{stat.stat.strikeOuts ?? '-'}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>Career</td>
                            <td>{playerStats[0].gamesPlayed ?? '-'}</td>
                            <td>{playerStats[0].plateAppearances ?? '-'}</td>
                            <td>{playerStats[0].atBats ?? '-'}</td>
                            <td>{playerStats[0].hits ?? '-'}</td>
                            <td>{playerStats[0].doubles ?? '-'}</td>
                            <td>{playerStats[0].triples ?? '-'}</td>
                            <td>{playerStats[0].homeRuns ?? '-'}</td>
                            <td>{playerStats[0].groundOuts ?? '-'}</td>
                            <td>{playerStats[0].airOuts ?? '-'}</td>
                            <td>{playerStats[0].strikeOuts ?? '-'}</td>
                        </tr>
                    </tbody>
                </table>
            )
        } else if (statType === 'pitching') {
            return (
                <table className="statTable table table-striped">
                    <thead className="thead-dark">
                        <tr className="table-dark">
                            <th scope="col" className="col-1">Year</th>
                            <th scope="col" className="col-1">Games Played</th>
                            <th scope="col" className="col-1">Games Started</th>
                            <th scope="col" className="col-1">ERA</th>
                            <th scope="col" className="col-1">AB</th>
                            <th scope="col" className="col-1">H</th>
                            <th scope="col" className="col-1">2B</th>
                            <th scope="col" className="col-1">3B</th>
                            <th scope="col" className="col-1">HR</th>
                            <th scope="col" className="col-1">SO</th>
                            <th scope="col" className="col-1">W-L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerStats[1].map((stat) => {
                            return (
                                <tr>
                                    <td>{stat.season ?? '-'}</td>
                                    <td>{stat.stat.gamesPlayed ?? '-'}</td>
                                    <td>{stat.stat.gamesStarted ?? '-'}</td>
                                    <td>{stat.stat.era ?? '-'}</td>
                                    <td>{stat.stat.atBats ?? '-'}</td>
                                    <td>{stat.stat.hits ?? '-'}</td>
                                    <td>{stat.stat.doubles ?? '-'}</td>
                                    <td>{stat.stat.triples ?? '-'}</td>
                                    <td>{stat.stat.homeRuns ?? '-'}</td>
                                    <td>{stat.stat.strikeOuts ?? '-'}</td>
                                    <td>{stat.stat.wins} - {stat.stat.losses}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>Career</td>
                            <td>{playerStats[0].gamesPlayed ?? '-'}</td>
                            <td>{playerStats[0].gamesStarted ?? '-'}</td>
                            <td>{playerStats[0].era ?? '-'}</td>
                            <td>{playerStats[0].atBats ?? '-'}</td>
                            <td>{playerStats[0].hits ?? '-'}</td>
                            <td>{playerStats[0].doubles ?? '-'}</td>
                            <td>{playerStats[0].triples ?? '-'}</td>
                            <td>{playerStats[0].homeRuns ?? '-'}</td>
                            <td>{playerStats[0].strikeOuts ?? '-'}</td>
                            <td>{playerStats[0].wins} - {playerStats[0].losses}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }

        return (
            <table className="statTable table table-striped">
                <thead>
                    <tr className="table-dark">
                        <th scope="col" className="col-1">Year</th>
                        <th scope="col" className="col-1">Position</th>
                        <th scope="col" className="col-1">Games Played</th>
                        <th scope="col" className="col-1">Games Started</th>
                        <th scope="col" className="col-1">Innings</th>
                        <th scope="col" className="col-1">Assists</th>
                        <th scope="col" className="col-1">Chances</th>
                        <th scope="col" className="col-1">Put Outs</th>
                        <th scope="col" className="col-1">Double Plays</th>
                        <th scope="col" className="col-1">Triple Plays</th>
                        <th scope="col" className="col-1">Fielding %</th>
                        <th scope="col" className="col-1">Errors</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats[1].map((stat) => {
                        return (
                            <tr>
                                <td>{stat.season ?? '-'}</td>
                                <td>{stat.stat.position.name ?? '-'}</td>
                                <td>{stat.stat.gamesPlayed ?? '-'}</td>
                                <td>{stat.stat.gamesStarted ?? '-'}</td>
                                <td>{stat.stat.innings ?? '-'}</td>
                                <td>{stat.stat.assists ?? '-'}</td>
                                <td>{stat.stat.chances ?? '-'}</td>
                                <td>{stat.stat.putOuts ?? '-'}</td>
                                <td>{stat.stat.doublePlays ?? '-'}</td>
                                <td>{stat.stat.triplePlays ?? '-'}</td>
                                <td>{(stat.stat.fielding * 100).toString().substring(0, 5)}%</td>
                                <td>{stat.stat.errors}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Career</td>
                        <td></td>
                        <td>{playerStats[0].gamesPlayed ?? '-'}</td>
                        <td>{playerStats[0].gamesStarted ?? '-'}</td>
                        <td>{playerStats[0].innings ?? '-'}</td>
                        <td>{playerStats[0].assists ?? '-'}</td>
                        <td>{playerStats[0].chances ?? '-'}</td>
                        <td>{playerStats[0].putOuts ?? '-'}</td>
                        <td>{playerStats[0].doublePlays ?? '-'}</td>
                        <td>{playerStats[0].triplePlays ?? '-'}</td>
                        <td>{(playerStats[0].fielding * 100).toString().substring(0, 5)}%</td>
                        <td>{playerStats[0].errors}</td>
                    </tr>
                </tbody>
            </table>
        )
    }




    return (
        <>
            <div className="stats">
                <h2>Career Stats</h2>
                <div>
                    <input type="radio" value='hitting' id="hitting" name="stats" />
                    <label htmlFor="hitting" onClick={() => getStats('hitting')}>Hitting</label>
                </div>
                <div>
                    <input type="radio" value='pitching' id="pitching" name="stats" />
                    <label htmlFor="pitching" onClick={() => getStats('pitching')}>Pitching</label>
                </div>
                <div>
                    <input type="radio" value='fielding' id="fielding" name="stats" />
                    <label htmlFor="fielding" onClick={() => getStats('fielding')}>Fielding</label>
                </div>

            </div>
            {(isLoading && <h1>Loading..</h1>) || getTable()}
        </>

    )

}

export default PlayerStats;