import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { signUpAuth } from '../../context/AuthProvider';

const LoginForm = () => {
  const login = useContext(signUpAuth);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      // If login successful, update context
      login.setLoginInfo({
        Username: result.user.username,
        password: data.password,
      });

      login.setUser(true);

      const CInfo = {
        username: result.user.username,
        fullname: result.user.fullname,
        email: result.user.email
      };

      login.setCInfo(CInfo);
      console.log("CInfo set:", CInfo);
      
      reset();
      navigate("/deepfake-detection");

    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className='flex justify-between'>
      <div className='h-screen gradient-signup signupform-width flex justify-center items-center px-4 side-border-detect'>
        <form 
          className='side-border-detect px-8 py-6 w-96 flex flex-col bg-black bg-opacity-50 rounded-lg font-semibold' 
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className='text-center text-2xl mt-4 mb-2'>Login</p>
          <p className='text-center text-xl mb-4'>
            <Link to='/'>Genuine Vision</Link>
          </p>

          <label>Enter Username</label>
          <input 
            className='p-1 outline-none text-black rounded-md my-2' 
            type='text' 
            {...register("username", { 
              required: "Username is required" 
            })} 
          />
          {errors.username && 
            <span className='text-sm text-red-600'>
              {errors.username.message}
            </span>
          }

          <label>Enter Password</label>
          <input 
            className='p-1 outline-none text-black rounded-md my-2' 
            type='password' 
            {...register("password", { 
              required: "Password is required" 
            })} 
          />
          {errors.password && 
            <span className='text-sm text-red-600'>
              {errors.password.message}
            </span>
          }

          <p className='self-end'>Forgot Password?</p>

          <input 
            className='font-extrabold rounded-lg border-2 navitem py-1 cursor-pointer my-2' 
            type="submit" 
            value="Login"
          />

          <p>Don't have an account? 
            <Link to="/signup">
              <span className='text-blue-600 underline'>Signup</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;