import React, { useContext, useEffect, useState } from 'react';
import { signUpAuth } from '../../context/AuthProvider';

const CurrentInfo = () => {
  const { CInfo } = useContext(signUpAuth);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!CInfo?.username) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/${CInfo.username}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user info');
        }

        setUserInfo(data.user);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [CInfo?.username]);

  if (loading) {
    return (
      <div className='flex side-border-detect bg-black bg-opacity-70'>
        <div className='p-8 flex-col space-y-8'>
          <p className='text-center py-4 text-xl font-bold'>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex side-border-detect bg-black bg-opacity-70'>
        <div className='p-8 flex-col space-y-8'>
          <p className='text-center py-4 text-xl font-bold text-red-500'>Error loading user information</p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className='flex side-border-detect bg-black bg-opacity-70'>
        <div className='p-8 flex-col space-y-8'>
          <p className='text-center py-4 text-xl font-bold'>No user information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex side-border-detect bg-black bg-opacity-70'>
      <div className='p-8 flex-col space-y-8'>
        <p className='text-center py-4 text-xl font-bold'>Current Credentials</p>
        <div className='font-semibold'>
          <p>Username</p>
          <p>{userInfo.username}</p>
        </div>
        <div className='font-semibold'>
          <p>Full Name</p>
          <p>{userInfo.fullname}</p>
        </div>
        <div className='font-semibold'>
          <p>Email</p>
          <p>{userInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentInfo;