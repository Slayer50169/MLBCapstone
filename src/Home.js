import { Parallax } from 'react-parallax';

import { Link } from 'react-router-dom';

function Home() {
    return (
        <Parallax bgImage='https://gobearcats.com/images/2023/5/24/Recap_Photo.jpg'>
            <div className='home container-fluid text-center vh-100'>
                <div className='row justify-content-center'>
                    <div className='card col-10 col-sm-8 col-md-6 col-lg-4 text-bg-dark mt-5'>
                        <div className='card-body'>
                            <h2 className='card-title'>About</h2>
                            <p className='card-text'>
                                This site was designed to make it easy to get sports information about Major League Baseball(MLB) teams and or players.
                                Use the search bar to search for your favorite players or teams to find out more about them.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-around mt-5'>
                    <div className='card text-bg-dark col-10 col-sm-8 col-md-6 col-lg-4'>
                        <div className='card-body'>
                            <h2 className='card-title'>Teams</h2>
                            <p className='card-text'>
                                Get details about your favorite teams roster as well as where the play and when they were founded.
                            </p>
                            <Link className='btn btn-primary' to='/teams'>Take me there!</Link>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center mt-5'>
                    <div className='card col-10 col-sm-8 col-md-6 col-lg-4 text-bg-dark'>
                        <div className='card-body'>
                            <h2 className='card-title'>Games</h2>
                            <p className='card-text'>
                                Search for games and see the scoring for that game!
                            </p>
                            <Link className='btn btn-primary' to='/games'>Take me there!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>

    )
}

export default Home;