import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { signUpAuth } from '../../context/AuthProvider';

const UpdatePassword = () => {
  const { CInfo } = useContext(signUpAuth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage('');

      const response = await fetch('http://localhost:5000/api/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: CInfo.username,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      setMessage('Password updated successfully!');
      reset();

    } catch (error) {
      console.error('Update password error:', error);
      setMessage('An error occurred while updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className='p-1 w-full outline-none text-black rounded-md'
            type='password'
            placeholder="Current Password"
            {...register("currentPassword", {
              required: "Current password is required"
            })}
          />
          {errors.currentPassword && (
            <span className='text-sm text-red-600'>
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div>
          <input
            className='p-1 w-full outline-none text-black rounded-md'
            type='password'
            placeholder="New Password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password length is low"
              }
            })}
          />
          {errors.newPassword && (
            <span className='text-sm text-red-600'>
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div>
          <input
            className='p-1 w-full outline-none text-black rounded-md'
            type='password'
            placeholder="Confirm New Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => 
                value === watch('newPassword') || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <span className='text-sm text-red-600'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 w-full rounded-lg border-1 navitem bg-red-500 text-white
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

        {message && (
          <p className={`text-sm text-center ${
            message.includes('successfully') ? 'text-green-500' : 'text-red-500'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdatePassword;