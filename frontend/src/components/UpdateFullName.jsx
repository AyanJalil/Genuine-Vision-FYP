import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { signUpAuth } from '../../context/AuthProvider';

const UpdateFullName = () => {
  const { signUpInfo, CInfo } = useContext(signUpAuth);
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

      const response = await fetch('http://localhost:5000/api/update-fullname', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: CInfo.username,
          newFullname: data.fullname
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
          signUpInfo[i].Fullname = data.fullname;
          CInfo.fullname = data.fullname;
          break;
        }
      }

      setMessage('Full name updated successfully!');
      reset();

    } catch (error) {
      console.error('Update fullname error:', error);
      setMessage('An error occurred while updating full name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <form className='space-x-2' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='p-1 outline-none text-black rounded-md my-2'
          type='text'
          placeholder="Enter new full name"
          {...register("fullname", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Full name must be at least 2 characters"
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
        <br/>
        {errors.fullname && 
          <span className='text-sm text-red-600'>
            {errors.fullname.message}
          </span>
        }
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

export default UpdateFullName