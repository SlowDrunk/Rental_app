import React from 'react'
import HomeSwiper from './components/Swiper'
import RentalGroups from './components/RentalGroups'
export default function HomeIndex() {
    return (
        <div className='homeIndex'>
            <div>
                <HomeSwiper></HomeSwiper>
                <RentalGroups></RentalGroups>
            </div>
        </div>
    )
}
