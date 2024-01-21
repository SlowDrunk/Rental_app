import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'

export default function Home() {

  return (
    <div className='flex flex-col'>
      <div className='flex-1'>
        <Outlet></Outlet>
      </div>
      <div className='flex-1'>
        {/* TabBar部分 */}
        <NavBar></NavBar>
      </div>

    </div>
  )
}
