import { useEffect, useState } from "react";
import Game from "../Game/Game.js";
import axios from "axios";

function Games() {
    let mainReq = "https://statsapi.mlb.com/api"
    let [games, setGames] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [value, setValue] = useState(getDate());


    useEffect(() => {
        // Gets games when the date is changed
        getGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    function getDate() {
        // Gets todays today and returns it in a format that the input can handle.
        let today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    function handleChange(e) {
        // Handles changes for the date input
        setValue(e.target.value);
    }

    async function getGames() {
        // Gets games for the date that is picked, current date on start.
        setGames([]);
        setIsLoading(true);
        let sched = await axios.get(mainReq + `/v1/schedule/games?sportId=1&date=${value.substring(5, 7)}/${value.substring(8, 10)}/${value.substring(0, 4)}`)
        let gameArray = []
        if (sched.data.dates[0]?.games) {
            for (let game of sched.data.dates[0].games) {
                let data = await axios.get(mainReq + `/v1.1/game/${game.gamePk}/feed/live`);
                gameArray.push(data.data);
            }
            setGames(gameArray);
        }
        setIsLoading(false)

    }


    return (
        <div className="container-fluid text-bg-dark bg-dark-subtle">
            <div className="card col-8 col-md-6 col-lg-4 col-xl-2 mx-auto mt-5">
                <div className="card-body">
                    <h5 className="card-title">Search for games here!</h5>
                    <input type="date" value={value} onChange={handleChange}></input>
                </div>
            </div>

            {isLoading ?
                <h3 className="mt-3">Loading...</h3> :
                <div className="row justify-content-evenly">
                    {games.length > 0 ? games.map((game) => {
                        return (
                            <Game game={game} />
                        )
                    }) :
                        <div>
                            <h2>No games available.</h2>
                            <h5>Try selecting a different date.</h5>
                        </div>}
                </div>}

        </div>
    )

}

export default Games;