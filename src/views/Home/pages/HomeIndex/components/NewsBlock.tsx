import { getRenralNewsData } from '@/api'
import { useMap } from '@/views/Home/hooks/useMap'
import { Toast } from 'antd-mobile'
import React, { useEffect, useState } from 'react'

interface NewsItem {
    date: string
    from: string
    id: number
    imgSrc: string
    title: string
}

/**
 * 生成news子节点
 *
 * @param {NewsItem[]} data - 后端返回的资讯数据
 * @returns {HTMLElement} - 索要渲染的新闻节点
 */
const NewsItemRender = (data: NewsItem[]) => {
    return data.map((item) => {
        return (
            <div className='flex flex-row gap-2 p-[6px]' style={{ borderBottom: '1px solid #ececec' }} key={item.id}>
                <div className='w-[109px]'>
                    <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </div>
                <div className='flex flex-col justify-between' >
                    <div className='text-[14px] font-semibold'>{item.title}</div>
                    <div className='text-[12px] text-[#ccc] flex flex-row justify-between'>
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </div>
                </div>
            </div>
        )
    })
}

export default function NewsBlock() {
    const [newsData, setNewsData] = useState<NewsItem[]>([])
    useEffect(() => {
        // @ts-ignore
        getRenralNewsData(JSON.parse(localStorage.getItem('cityInfo')).value).then(res => {
            setNewsData(res.data.body)
        }).catch((err) => {
            Toast.show({
                icon: 'fail',
                content: '数据获取出错了',
            })
            console.error(err)
        })
    }, [])
    return (
        <div className='bg-white p-[10px]'>
            <div className='flex flex-row justify-between items-center  w-full py-[3px] px-[10px]'>
                <div className='text-[14px] font-semibold'>最新资讯</div>
            </div>
            <div className='flex flex-col'>
                {NewsItemRender(newsData)}
            </div>
        </div>
    )
}
