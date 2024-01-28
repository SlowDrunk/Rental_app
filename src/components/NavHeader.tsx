import { NavBar } from 'antd-mobile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface NavHeaderProps {
    header: string
}
export default function NavHeader(props: NavHeaderProps) {
    const navigate = useNavigate()
    return (
        <div>      <NavBar
            style={{
                '--height': '36px',
                '--border-bottom': '1px #eee solid',
            }}
            onBack={() => navigate(-1)}
        >
            {props.header}
        </NavBar></div>
    )
}
