import React from 'react'
import HomeSwiper from './components/Swiper'
import RentalGroups from './components/RentalGroups'
import NewsBlock from './components/NewsBlock'
export default function HomeIndex() {
    return (
        <div className='homeIndex h-[94vh] overflow-auto'>
            <div>
                <HomeSwiper></HomeSwiper>
                <RentalGroups></RentalGroups>
                <NewsBlock></NewsBlock>
            </div>
        </div>
    )
}
