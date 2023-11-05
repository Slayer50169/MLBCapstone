import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='home container-fluid text-center vh-100'>
            <h1 className='text-light'>Major League Baseball Statistics</h1>
            <hr />
            <div className='row justify-content-center'>
                <div className='card col-4 text-bg-dark'>
                    <div className='card-body'>
                        <h2 className='card-title'>About</h2>
                        <p className='card-text'>
                            This site was designed to make it easy to get sports information about Major League Baseball(MLB) teams and or players.
                            Use the search bar to search for your favorite players or teams to find out more about them.
                        </p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className='row justify-content-around'>
                <div className='card text-bg-dark col-4'>
                    <div className='card-body'>
                        <h2 className='card-title'>Teams</h2>
                        <p className='card-text'>
                            Get details about your favorite teams roster aswell as where the play and when they were founded.
                        </p>
                        <br/>
                        <Link className='btn btn-primary' to='/teams'>Take me there!</Link>
                    </div>
                </div>
                <div className='card text-bg-dark col-4'>
                    <div className='card-body'>
                        <h2 className='card-title'>Players</h2>
                        <p className='card-text'>
                            Get statistics about a players career including their hitting, pitching, and fielding stats!
                        </p>
                        <br/>
                        <Link className='btn btn-primary' to='/players'>Take me there!</Link>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className='row justify-content-center'>
                <div className='card col-4 text-bg-dark'>
                    <div className='card-body'>
                        <h2 className='card-title'>Games</h2>
                        <p className='card-text'>
                            Search for games and see the scoring for that game!
                        </p>
                        <br/>
                        <Link className='btn btn-primary' to='/games'>Take me there!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;