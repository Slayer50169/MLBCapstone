import NotFound from '../NotFound/NotFound.js';
import Player from '../Player/Player.js';
import Home from '../Home/Home.js'
import Teams from '../Teams/Teams.js';
import Team from '../Team/Team.js'
import Games from '../Games/Games.js';
import { Route, Navigate, Routes } from 'react-router-dom';



export default function Paths() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path='/home' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='/player/:id' element={<Player />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/team/:id' element={<Team />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}