import { useEffect, useState } from "react";
import './Games.css'
import Game from "./Game";
import axios from "axios";

function Games(){
    let mainReq = "https://statsapi.mlb.com/api"
    let [games, setGames] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [value, setValue] = useState(getDate());


    useEffect(() => {
        getGames();
    }, [value])

    function getDate(){
        let today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    function handleChange(e){
        setValue(e.target.value);
    }

    async function getGames(){
        setGames([]);
        setIsLoading(true);
        let sched = await axios.get(mainReq + `/v1/schedule/games?sportId=1&date=${value.substring(5,7)}/${value.substring(8,10)}/${value.substring(0,4)}`)
        let gameArray = []
        if(sched.data.dates[0]?.games){
            for(let game of sched.data.dates[0].games){
                let data = await axios.get(mainReq + `/v1.1/game/${game.gamePk}/feed/live`);
                gameArray.push(data.data);
            }
            setGames(gameArray);
        }
        setIsLoading(false)
        
    }

    if(isLoading){
        return (
            <div className="container-fluid">
                <input type="date" value={value} onChange={handleChange} className="mt-5"></input>
                <h3 className="mt-3">Loading...</h3>
            </div>
        )
    }
    
    

    return (
        <div className="container-fluid">
            <input type="date" value={value} onChange={handleChange} className="mt-5"></input>
            <div className="row justify-content-evenly">
            {games.length > 0 ? games.map((game) =>{
                return (
                    <Game game={game}/>
                )
            }) : <h2>No Games Available.</h2>}
            </div>
        </div>
    )

}

export default Games;