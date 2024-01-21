import { createBrowserRouter } from 'react-router-dom'
import Home from '@/views/Home'
import Citylist from '@/views/Citylist'
import News from '@/views/Home/pages/News'
import NotFond from '@/views/NotFond'
import HomeIndex from '@/views/Home/pages/HomeIndex'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                element: <HomeIndex></HomeIndex>,
            },
            {
                path: "findHouse",
                element: <div>找房</div>,
            },
            {
                path: "informations",
                element: <News />,
            },
            { path: 'personalCenter', element: <div>我的</div> },
        ]
    },
    {
        path: '/citylist',
        element: <Citylist />,
    }, {
        path: "*",
        element: <NotFond></NotFond>,
    }
])



