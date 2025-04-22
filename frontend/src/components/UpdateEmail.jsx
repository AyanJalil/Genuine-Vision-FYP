import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { signUpAuth } from '../../context/AuthProvider';

const UpdateEmail = () => {
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

      // Send update request to backend
      const response = await fetch('http://localhost:5000/api/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: CInfo.username,
          newEmail: data.email
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      // Update local state
      for (var i = 0; i < signUpInfo.length; i++) {
        if (signUpInfo[i].Username === CInfo.username) {
          signUpInfo[i].Email = data.email;
          CInfo.email = data.email;
          break;
        }
      }

      setMessage('Email updated successfully!');
      reset();

    } catch (error) {
      console.error('Update email error:', error);
      setMessage('An error occurred while updating email');
    } finally {
      setLoading(false);
    }
    triggerRefresh();
  };

  return (
    <div className="max-w-md">
      <form 
        className='space-x-2' 
        onSubmit={handleSubmit(onSubmit)}
      >
          <input
            className='p-1 outline-none text-black rounded-md'
            type='email'
            placeholder="Enter new email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && 
            <span className='text-sm text-red-600'>
              {errors.email.message}
            </span>
          }
          <button
          type="submit"
          disabled={loading}
          className={`px-2 py-1 rounded-lg border-1 navitem bg-red-500 text-white
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <br/>
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

export default UpdateEmail;