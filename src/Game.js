import './Game.css'

function Game({ game }) {
    let inningCount = 0;

    function getScore(team) {
        inningCount = 0
        return (game.liveData.linescore.innings.map((inning) => {
            inningCount++;
            if (!(inning.away?.runs >= 0)) return <td>-</td>
            if (team === 'away') {
                return (
                    <td inn={inning.num}>{inning.away.runs}</td>
                )
            }
            return (
                <td>{inning.home.runs}</td>
            )
        })
        )
    }
    function getEmptyScore() {
        let emptyTds = []
        for (let i = 0; i < 9 - inningCount; i++) {
            emptyTds.push((<td>-</td>))
        }
        return emptyTds;
    }


    return (
        <div className="game card col-5 bg-dark text-light mt-5">
            <div>
                <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`} alt={game.gameData.teams.away.name + ' logo'} title={game.gameData.teams.away.name + ' logo'} />
                <h2>{game.gameData.teams.away.abbreviation} {game.liveData.linescore.teams.away.runs} - {game.liveData.linescore.teams.home.runs} {game.gameData.teams.home.abbreviation}</h2>
                <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.home.id}.svg`} alt={game.gameData.teams.home.name + ' logo'} title={game.gameData.teams.home.name + ' logo'} />
            </div>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col' className='col'></th>
                        <th scope='col' className='col'>1</th>
                        <th scope='col' className='col'>2</th>
                        <th scope='col' className='col'>3</th>
                        <th scope='col' className='col'>4</th>
                        <th scope='col' className='col'>5</th>
                        <th scope='col' className='col'>6</th>
                        <th scope='col' className='col'>7</th>
                        <th scope='col' className='col'>8</th>
                        <th scope='col' className='col'>9</th>
                        {game.liveData.linescore.innings.slice(9).map(inn => {
                            return <th scope='col' className='col-1'>{inn.num}</th>
                        })}
                        <th scope='col' className='col'>R</th>
                        <th scope='col' className='col'>H</th>
                        <th scope='col' className='col'>E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="awayLinescore">
                        <td>{game.gameData.teams.away.abbreviation}</td>
                        {getScore('away')}
                        {getEmptyScore().map((td) => {
                            return td;
                        })}
                        <td>{game.liveData.linescore.teams.away.runs}</td>
                        <td>{game.liveData.linescore.teams.away.hits}</td>
                        <td>{game.liveData.linescore.teams.away.errors}</td>
                    </tr>
                    <tr className="homeLinescore">
                        <td>{game.gameData.teams.home.abbreviation}</td>
                        {getScore('home')}
                        {getEmptyScore().map((td) => {
                            return td;
                        })}
                        <td>{game.liveData.linescore.teams.home.runs}</td>
                        <td>{game.liveData.linescore.teams.home.hits}</td>
                        <td>{game.liveData.linescore.teams.home.errors}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Game;