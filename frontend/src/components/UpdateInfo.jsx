import React from 'react'
import UpdateUserName from './UpdateUserName'
import UpdateFullName from './UpdateFullName'
import UpdateEmail from './UpdateEmail'
import UpdatePassword from './UpdatePassword'

const UpdateInfo = () => {
  return (
    <>
     <div className='flex side-border-detect bg-black bg-opacity-70'>
        <div className='p-8 flex-col space-y-8'>
            <p className='text-center py-4 text-xl font-bold'>Update Credientials</p>
            <div className='font-semibold'>
                <p>Update UserName</p>
                <UpdateUserName/>
            </div>
            <div className='font-semibold'>
                <p>Update FullName</p>
                <UpdateFullName/>
            </div>
            <div className='font-semibold'>
                <p>Update Email</p>
                <UpdateEmail/>
            </div>
            <div className='font-semibold'>
                <p>Update Password</p>
                <UpdatePassword/>
            </div>
        </div>
    </div>
    </>
  )
}

export default UpdateInfo
