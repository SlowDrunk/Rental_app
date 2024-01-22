import React from 'react'
import { ErrorBlock } from 'antd-mobile'
import { Link } from 'react-router-dom'

export default function NotFond() {
    return (
        <div className='flex items-center justify-center h-full w-full'>
            <ErrorBlock
                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                style={{
                    '--image-height': '150px',
                }}
                description={
                    <span className='text-[34px] font-semibold'>
                        404 NotFond
                    </span>
                }
            >
                <Link to={'/'}>返回首页</Link>
            </ErrorBlock>
        </div>
    )
}
