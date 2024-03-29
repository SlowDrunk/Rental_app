import React, { useEffect, useState } from 'react'
import { Swiper, Toast } from 'antd-mobile'
import { getSwiperData } from '@/api'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useMap } from '@/hooks/useMap'
import SearchNav from '@/components/SearchNav'


// 引入底部当行所需要的静态资源
import nav1 from '@/assets/images/nav-1.png'
import nav2 from '@/assets/images/nav-2.png'
import nav3 from '@/assets/images/nav-3.png'
import nav4 from '@/assets/images/nav-4.png'


interface SwiperItem {
    id: number,
    imgSrc: string,
    alt: string
}
/**
 * 渲染swiper相关dom
 *
 * @param {Array} data - 后端获取到的swiper列表数据
 * @returns {HTMLElement} 
 */
const swiperItemRender = (data: SwiperItem[]) => {
    const dom = data.map((item) => (
        <Swiper.Item key={item.id}>
            <div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt={item.alt} />
            </div>
        </Swiper.Item>
    ))
    return dom
}
/**
 * 渲染轮播图底部导航
 * @param {NavigateFunction} navigate - 路由跳转实例
 * @returns {HTMLElement} 
 * 
 */
const homeNavRender = (navigate: NavigateFunction) => {
    const imgList = [{ imgUrl: nav1, text: '整租', routerPath: '/findHouse' }, { imgUrl: nav2, text: '合租', routerPath: '/findHouse' }, { imgUrl: nav3, text: '地图找房', routerPath: '/map' }, { imgUrl: nav4, text: '去出租', routerPath: '/findHouse' }]
    return imgList.map(img => {
        return (
            <div className='flex flex-col items-center' key={img.text} onClick={() => navigate(img.routerPath)}>
                <img className='w-[3rem]' src={img.imgUrl} alt="nav" />
                <span className='text-[.8125rem] mt-[.4375rem]'>{img.text}</span>
            </div>
        )
    })
}

export default function HomeSwiper() {
    const [images, setImages] = useState<SwiperItem[]>([])
    const [curCity, setCurCity] = useState<any>({})
    const navigate = useNavigate()
    const { getCityInfo } = useMap()

    useEffect(() => {
        getSwiperData().then(res => {
            if (res.status >= 400) return
            setImages(res.data.body)
        }).catch((err) => {
            Toast.show({
                icon: 'fail',
                content: '数据获取出错了',
            })
            console.log(err)
        })
        getCityInfo().then((res) => {
            setCurCity(res)
        })
    }, [])
    return (
        <div className='relative'>
            {images.length > 0 ? <Swiper
                loop
                autoplay
            >
                {swiperItemRender(images)}
            </Swiper> : <div>
                暂无数据
            </div>}
            <SearchNav></SearchNav>
            <div className='flex flex-row w-full justify-around px-[.625rem] mt-[.625rem]'>
                {homeNavRender(navigate)}
            </div>
        </div>
    )
}
