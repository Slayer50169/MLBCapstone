import { useEffect, useState } from "react";
import './Games.css'
import Game from "./Game";
import axios from "axios";

function Games(){
    let mainReq = "https://statsapi.mlb.com/api"
    let [games, setGames] = useState([]);
    let [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getGames();
    }, [])

    async function getGames(){
        setGames([]);
        setIsLoading(true);
        let sched = await axios.get(mainReq + "/v1/schedule/games?sportId=1")
        console.log(sched);
        let gameArray = []
        if(sched.data.dates[0]?.games){
            for(let game of sched.data.dates[0].games){
                console.log('for')
                let data = await axios.get(mainReq + `/v1.1/game/${game.gamePk}/feed/live`);
                gameArray.push(data.data);
            }
            console.log(gameArray);
            setGames(gameArray);
            console.log('games:', games)
        }
        setIsLoading(false)
        
    }

    if(isLoading){
        return (
            <h2>Loading...</h2>
        )
    }
    
    
    if(games.length === 0){
        return <h2>No Games Available.</h2>
    }

    return (
        <div className="games">
            {games.map((game) =>{
                return (
                    <Game game={game}/>
                )
            })}
        </div>
    )

}

export default Games;