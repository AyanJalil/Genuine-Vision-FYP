import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { signUpAuth } from '../../context/AuthProvider';

const UpdateUserName = () => {
  const { signUpInfo, CInfo, triggerRefresh } = useContext(signUpAuth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage('');

      const response = await fetch('http://localhost:5000/api/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUsername: CInfo.username,
          newUsername: data.username
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      // Update local state
      const updatedSignUpInfo = signUpInfo.map(user => {
        if (user.Username === CInfo.username) {
          return { ...user, Username: data.username };
        }
        return user;
      });

      // Update context
      signUpInfo.length = 0;
      signUpInfo.push(...updatedSignUpInfo);
      CInfo.username = data.username;

      setMessage('Username updated successfully!');
      reset();

    } catch (error) {
      console.error('Update username error:', error);
      setMessage('An error occurred while updating username');
    } finally {
      setLoading(false);
    }
    triggerRefresh();
  };

  return (
    <div className="max-w-md">
      <form className='space-x-2' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='p-1 outline-none text-black rounded-md my-2'
          type='text'
          placeholder="Enter new username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters"
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: "Username can only contain letters, numbers, underscores, and hyphens"
            }
          })}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-2 py-1 rounded-lg border-1 navitem bg-red-500 text-white
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <br />
        {errors.username && (
          <span className='text-sm text-red-600'>
            {errors.username.message}
          </span>
        )}
        {message && (
          <p className={`text-sm ${
            message.includes('successfully') ? 'text-green-500' : 'text-red-500'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateUserName;