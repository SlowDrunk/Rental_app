import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SearchNav() {
    const navigate = useNavigate()
    const [currentRouter] = useState<string>(useLocation().pathname)
    return (
        <div className='absolute w-full flex items-center flex-row gap-[.8125rem] px-[1.25rem]' style={currentRouter === '/findHouse' ? { top: '0px', background: '#efefef', padding: '8px 1.25rem' } : { top: '1rem', background: 'transparent' }}>
            <div onClick={() => { navigate(-1) }} className=' hover:text-[#21b97a]' style={{display:currentRouter === '/findHouse' ? 'block' : 'none'}}>
                <i className='iconfont icon-back h-full text-[12px]'></i>
            </div>
            <div className='flex flex-row bg-white flex-1 rounded-md'>
                <div className='flex flex-row items-center '>
                    <div className='p-[.375rem]' style={{ borderRight: '.0625rem solid #eeeeee' }} onClick={() => navigate('/citylist')}>
                        {/* @ts-ignore */}
                        <span className='text-[.875rem] text-[#666666] font-medium mr-1'>{JSON.parse(localStorage.getItem('cityInfo')).label}</span>
                        <i className='iconfont icon-arrow text-[#cccccc] text-[.75rem]'></i>
                    </div>
                    <div className='px-[.625rem] flex flex-row items-center' onClick={() => navigate('/search')}>
                        <i className='iconfont icon-seach text-[#cccccc]'></i>
                        <span className='text-[.875rem] text-[#cccccc]'>请输入小区或地址</span>
                    </div>
                </div>
            </div>
            <div className='text-[#ffffff] h-full' style={{ color: currentRouter === '/findHouse' ? '#21b97a' : '#ffffff' }} onClick={() => navigate('/map')}>
                <i className='iconfont icon-map h-full text-[1.5rem]'></i>
            </div>
        </div>
    )
}
