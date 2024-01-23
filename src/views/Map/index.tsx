import React, { useEffect, useState } from 'react'
import { useMap } from '../Home/hooks/useMap'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

export default function MapDom() {
    const [map, setMap] = useState<any | null>(useMap())
    const navigate = useNavigate()
    useEffect(() => {
        map.createMap()
        return () => {
            setMap(null)
        }
    }, [])
    return (
        <div className='h-full relative'>
            <div className='absolute top-0 w-full z-40 bg-white'>
                <NavBar
                    style={{
                        '--height': '36px',
                        '--border-bottom': '1px #eee solid',
                    }}
                    onBack={() => navigate(-1)}
                >
                    地图找房
                </NavBar>
            </div>
            <div id='mapContainer' className='h-full'></div>
        </div>
    )
}
