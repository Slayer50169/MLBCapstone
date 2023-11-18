import NotFound from './NotFound';
import Player from './Player';
import Home from './Home'
import Teams from './Teams';
import Team from './Team'
import Games from './Games';
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