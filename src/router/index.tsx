import { createBrowserRouter } from 'react-router-dom'
import Home from '@/views/Home'
import Citylist from '@/views/Citylist'
import News from '@/views/Home/pages/News'
import NotFond from '@/views/NotFond'
import HomeIndex from '@/views/Home/pages/HomeIndex'
import MapDom from '@/views/Map'
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
    // 城市列表
    {
        path: '/citylist',
        element: <Citylist />,
    },
    // 搜索列表
    {
        path: '/search',
        element: <div>搜索列表</div>,
    },
    {
        path: '/map',
        element: <MapDom></MapDom>,
    },
    {
        path: "*",
        element: <NotFond></NotFond>,
    }
])



