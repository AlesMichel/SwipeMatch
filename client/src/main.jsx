import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProfileCreated from './pages/ProfileCreated.jsx'
import Dashboard from './pages/DashBoard.jsx'
import Browse from './pages/Browse.jsx'
import Welcome from './pages/Welcome.jsx'
import Matches from './pages/Matches.jsx'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/create" element={<App />} />
                <Route path="/created" element={<ProfileCreated />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/matches" element={<Matches />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)