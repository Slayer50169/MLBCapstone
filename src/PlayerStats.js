import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function PlayerStats({ id }) {
    let [playerStats, setPlayerStats] = useState({});
    let [statType, setStatType] = useState('hitting');
    let [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();
    let mainReq = 'https://statsapi.mlb.com/api/v1/people/';

    useEffect(() => {
        getStats(statType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getStats(type) {
        setIsLoading(true);
        let yearByYear = await axios.get(`${mainReq}${id}?hydrate=stats(group=[${type}],type=yearByYear,sportId=1),currentTeam`).catch(() => {
            navigate('/');
        });
        let stats = await axios.get(`${mainReq}${id}?hydrate=stats(group=[${type}],type=career,sportId=1),currentTeam`).catch(() => {
            navigate('/');
        })
        if (stats.data.people[0]?.stats) {
            setPlayerStats([stats.data.people[0].stats[0].splits, yearByYear.data.people[0].stats[0].splits]);
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
                        {playerStats[0].map((stat) => {
                            return (
                                <tr>
                                    <td>Career</td>
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
                        {playerStats[0].map((stat) => {
                            return (
                                <tr>
                                    <td>Career</td>
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
                                <td>{stat.stat.position.abbreviation ?? '-'}</td>
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
                    {playerStats[0].map((stat) => {
                        console.log('stat', stat)
                        return (
                            <tr>
                                <td>Career</td>
                                <td>{stat.position.abbreviation}</td>
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

                </tbody>
            </table>
        )
    }




    return (
        <div className="card bg-dark-subtle p-3 mx-auto mt-5 col-10 col-sm-8">
            <div className="card-body">
                <h2 className="card-title">Career Stats</h2>
                <div className="btn-group m-3" role="group">
                    <input className='btn-check' type="radio" id="hitting" name="stats" />
                    <label className='btn btn-dark' htmlFor="hitting" onClick={() => getStats('hitting')}>Hitting</label>

                    <input className="btn-check" type="radio" id="pitching" name="stats" />
                    <label className="btn btn-dark" htmlFor="pitching" onClick={() => getStats('pitching')}>Pitching</label>

                    <input className="btn-check" type="radio" id="fielding" name="stats" />
                    <label className="btn btn-dark" htmlFor="fielding" onClick={() => getStats('fielding')}>Fielding</label>
                </div>
                <div className="table-responsive">
                    {(isLoading && <h1>Loading..</h1>) || getTable()}
                </div>

            </div>
        </div>

    )

}

export default PlayerStats;