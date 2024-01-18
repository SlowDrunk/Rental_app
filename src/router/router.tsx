import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom'
import Home from '@/views/Home'
import Citylist from '@/views/Citylist'
export default function RouterConfig() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/citylist" Component={Citylist} />
                </Routes>
            </HashRouter>
        </div>
    )
}