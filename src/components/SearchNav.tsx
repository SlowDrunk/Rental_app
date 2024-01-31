import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchNav() {
    const navigate = useNavigate()
    return (
        <div className='absolute w-full h-[2.375rem] flex flex-row gap-[.8125rem] top-[1rem] px-[1.25rem]'>
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
            <div className='text-[#ffffff] h-full' onClick={() => navigate('/map')}>
                <i className='iconfont icon-map h-full text-[1.5rem]'></i>
            </div>
        </div>
    )
}
