import React, { useEffect, useState } from 'react'
import { TabBar } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import '@/assets/css/navBar.css'

export default function NavBar() {
    const tabs = [
        {
            key: '/',
            title: '首页',
            icon: <i className='iconfont icon-ind'></i>,
        },
        {
            key: '/findHouse',
            title: '找房',
            icon: <i className='iconfont icon-findHouse'></i>,
            badge: '5',
        },
        {
            key: '/informations',
            title: '资讯',
            icon: <i className='iconfont icon-infom'></i>,
        },
        {
            key: '/personalCenter',
            title: '我的',
            icon: <i className='iconfont icon-my'></i>,
        },
    ]
    // 路由跳转
    const navigate = useNavigate()
    const routerJump = (key: string) => {
        setActiveKey(key)
        navigate(key)
    }

    // 当前路由地址
    const currentRouter = useLocation().pathname
    // 当路由地址改变时联动逻辑
    useEffect(() => {
        setActiveKey(currentRouter)
    }, [currentRouter])
    const [activeKey, setActiveKey] = useState(useLocation().pathname)
    return (
        <div className='navBar bg-white'>
            <TabBar activeKey={activeKey} onChange={(val) => { routerJump(val) }} >
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}>
                    </TabBar.Item>
                ))}
            </TabBar>
        </div>
    )
}
