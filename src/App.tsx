import React from 'react';
import { router } from '@/router'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <div className='w-[100%] h-[100vh]'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
