import React, { useEffect, useState } from 'react'
import { getRenralGroupData } from '@/api/index'
import { Toast, Grid } from 'antd-mobile'

interface GroupsItem {
    id: number,
    title: string,
    desc: string,
    imgSrc: string,
}


/**
 * 渲染租房小组内部dom元素
 *
 * @param {GroupsItem[]} data - 后端返回数据
 * @returns {HTMLElement} - 返回Dom节点
 */
const GroupItemRender = (data: GroupsItem[]) => {
    return data.map((item) => {
        return (
            <Grid.Item key={item.id} >
                <div className='flex flex-row justify-center items-center shadow-s p-4 bg-white rounded-md'>
                    <div className='flex flex-col justify-around flex-1 gap-2 px-1'>
                        <div className='whitespace-nowrap text-[14px] font-semibold flex-shrink'>{item.title}</div>
                        <div className='whitespace-nowrap text-[12px] text-[#ccc]'>{item.desc}</div>
                    </div>
                    <div className='w-[69px]'>
                        <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                    </div>
                </div>
            </Grid.Item>
        )
    })
}

export default function RentalGroups() {
    const [groupsData, setGroupsData] = useState<GroupsItem[]>([])
    useEffect(() => {
        getRenralGroupData('AREA|88cff55c-aaa4-e2e0').then(res => {
            setGroupsData(res.data.body)
        }).catch((err) => {
            Toast.show({
                icon: 'fail',
                content: '数据获取出错了',
            })
            console.error(err)
        })
    }, [])
    return (
        <div className='bg-[#ececec] p-[10px]'>
            <div className='flex flex-row justify-between items-center  w-full py-[6px] px-[10px]'>
                <div className='text-[16px] font-semibold'>租房小组</div>
                <div className='text-[14px] text-[#ccc]'>更多</div>
            </div>
            <div>
                <Grid columns={2} gap={8}>
                    {GroupItemRender(groupsData)}
                </Grid>
            </div>
        </div>
    )
}
