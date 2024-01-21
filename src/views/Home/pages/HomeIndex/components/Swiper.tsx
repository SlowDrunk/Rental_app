import React, { useEffect, useState } from 'react'
import { Swiper, Toast } from 'antd-mobile'
import { getSwiperData } from '@/api'


interface SwiperItem {
    id: number,
    imgSrc: string,
    alt: string
}

const swiperItemRender = (data: SwiperItem[]) => {
    console.log(data)
    const dom = data.map((item) => (
        <Swiper.Item key={item.id}>
            <div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt={item.alt} />
            </div>
        </Swiper.Item>
    ))
    return dom
}
export default function HomeSwiper() {
    const [images, setImages] = useState<SwiperItem[]>([])
    useEffect(() => {
        getSwiperData().then(res => {
            if (res.status >= 400) return
            setImages(res.data.body)
        })
    }, [])
    return (
        <Swiper
            loop
            autoplay
        >
            {swiperItemRender(images)}
        </Swiper>
    )
}
