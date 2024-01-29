import React, { useEffect } from 'react'
import { useMap } from '../../hooks/useMap'
import NavHeader from '@/components/NavHeader'
import { Popup } from 'antd-mobile'


interface HouseInfo {
    houseImg: string;
    title: string;
    tags: string[];
    price: number;
    desc: string;
    houseCode: string;
}

const renderHouseList = (house: HouseInfo[]) => {
    if (house.length === 0) {
        return (
            <div className=' flex justify-center items-center text-[18px] text-[#cccccc]'>暂无数据</div>
        )
    } else {
        return house.map((item: HouseInfo) => {
            return (
                <div className='flex flex-row items-center px-[6px] py-[12px]' style={{borderBottom:'2px solid #ececec'}} key={item.houseCode}>
                    <div className='w-[154px] pr-[12px]'>
                        <img className='w-full' src={`http://localhost:8080${item.houseImg}`} alt="" />
                    </div>
                    <div className='flex-1'>
                        <div className='text-[14px] font-semibold'>{item.title}</div>
                        <div className='text-[12px] text-[#999]'>{item.desc}</div>
                        <div className='w-full flex flex-row gap-1'>
                            {item.tags.map((item: string) => {
                                return <div className='bg-[rgba(91,211,205,0.6)] text-[12px] text-[#1677ff] rounded-sm p-[1px]' key={item}>{item}</div>
                            })}
                        </div>
                        <div className='text-[#f86146]'>
                            <span className='text-[16px] font-semibold'>
                                {item.price}
                            </span>元/月
                        </div>
                    </div>
                </div>
            )
        })
    }
}

export default function MapDom() {
    const { showHouseList, setShowHouseList, createMap, houese } = useMap()
    useEffect(() => {
        createMap()
    }, [])

    return (
        <div className='h-full relative'>
            <div className='absolute top-0 w-full z-40 bg-white'>
                <NavHeader header={'地图找房'}></NavHeader>
            </div>
            <div id='mapContainer' className='h-full'></div>
            <div>
                <Popup
                    visible={showHouseList}
                    onMaskClick={() => {
                        setShowHouseList(false)
                    }}
                >
                    <div className='flex flex-row h-[36px] bg-slate-300 items-center justify-between px-[12px] w-full'>
                        <div className='text-[14px] font-semibold'>房屋列表</div>
                        <div className='text-[12px]'>更多房源</div>
                    </div>
                    <div className='min-h-[40vh] max-h-[48px] overflow-auto'>
                        {renderHouseList(houese)}
                    </div>
                </Popup>
            </div>
        </div>
    )
}
