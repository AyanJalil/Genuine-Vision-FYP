import React, { useContext} from 'react'
import { signUpAuth } from '../../context/AuthProvider'

const CurrentInfo = () => {

    const {CInfo} = useContext(signUpAuth)


  return (
    <>
    <div className='flex side-border-detect bg-black bg-opacity-70'>
        <div className='p-8 flex-col space-y-8'>
            <p className='text-center py-4 text-xl font-bold'>Current Credientials</p>
            <div className='font-semibold'>
                <p>UserName</p>
                <p>{CInfo.username}</p>
            </div>
            <div className='font-semibold'>
                <p>FullName</p>
                <p>{CInfo.fullname}</p>
            </div>
            <div className='font-semibold'>
                <p>Email</p>
                <p>{CInfo.email}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default CurrentInfo
