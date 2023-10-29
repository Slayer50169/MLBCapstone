import './Game.css'

function Game({ game }) {
    let inningCount = 0;

    function getScore(team) {
        inningCount = 0
        return (game.liveData.linescore.innings.map((inning) => {
            inningCount++;
            if(team === 'away'){
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
    function getEmptyScore(){
        let emptyTds = []
        for(let i = 0; i < game.liveData.linescore.currentInning - inningCount; i++){
            emptyTds.push((<td>-</td>))
        }
        return emptyTds;
    }


    return (
        <div className="game">
            <div>
                <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`} alt={game.gameData.teams.away.name + ' logo'} title={game.gameData.teams.away.name + ' logo'} />
                <h2>{game.gameData.teams.away.abbreviation} {game.liveData.linescore.teams.away.runs} - {game.liveData.linescore.teams.home.runs} {game.gameData.teams.home.abbreviation}</h2>
                <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.home.id}.svg`} alt={game.gameData.teams.home.name + ' logo'} title={game.gameData.teams.home.name + ' logo'} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        {game.liveData.linescore.innings.slice(9).map(inn =>{
                            return <th>{inn.num}</th>
                        })}
                        <th>R</th>
                        <th>H</th>
                        <th>E</th>
                    </tr>
                    <tr className="awayLinescore">
                        <td>{game.gameData.teams.away.abbreviation}</td>
                        {getScore('away')}
                        {getEmptyScore().map((td) =>{
                            return td;
                        })}
                        <td>{game.liveData.linescore.teams.away.runs}</td>
                        <td>{game.liveData.linescore.teams.away.hits}</td>
                        <td>{game.liveData.linescore.teams.away.errors}</td>
                    </tr>
                    <tr className="homeLinescore">
                        <td>{game.gameData.teams.home.abbreviation}</td>
                        {getScore('home')}
                        {getEmptyScore().map((td) =>{
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