import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { signUpAuth } from '../../context/AuthProvider';

const SignUpForm = () => {
  const { addUser, signUpInfo } = useContext(signUpAuth);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Frontend validation
      if (data.password.length < 8) {
        alert("Password length must be above 8 characters.");
        return;
      }

      // Send data to backend
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      // If successful, add to context
      const newUser = {
        Email: data.email,
        password: data.password,
        Fullname: data.fullname,
        Username: data.username
      };

      addUser(newUser);
      reset();
      navigate("/login");

    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  useEffect(() => {
    console.log(signUpInfo);
  }, [signUpInfo]);

  return (
    <div className=''>
      <div className='h-screen gradient-signup signupform-width flex justify-center items-center px-4 side-border-detect'>
        <form 
          className='side-border-detect px-8 py-6 w-96 flex flex-col space-y-2 bg-black bg-opacity-50 rounded-lg font-semibold' 
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className='text-center text-2xl'>Signup</p>
          <p className='text-center text-xl'>
            <Link to='/'>Genuine Vision</Link>
          </p>

          <label>Enter Username</label>
          <input 
            className='p-1 outline-none text-black rounded-md' 
            type='text' 
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
              }
            })} 
          />
          {errors.username && <span className='text-sm text-red-600'>{errors.username.message}</span>}

          <label>Enter Fullname</label>
          <input 
            className='p-1 outline-none text-black rounded-md' 
            type='text' 
            {...register("fullname", {
              required: "Full name is required"
            })} 
          />
          {errors.fullname && <span className='text-sm text-red-600'>{errors.fullname.message}</span>}

          <label>Enter Email</label>
          <input 
            className='p-1 outline-none text-black rounded-md' 
            type='email' 
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} 
          />
          {errors.email && <span className='text-sm text-red-600'>{errors.email.message}</span>}

          <label>Enter Password</label>
          <input 
            className='p-1 outline-none text-black rounded-md' 
            type='password' 
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })} 
          />
          {errors.password && <span className='text-sm text-red-600'>{errors.password.message}</span>}

          <input 
            className='font-extrabold rounded-lg border-2 navitem py-1 cursor-pointer' 
            type="submit" 
          />

          <p>Already have an account? 
            <Link to="/login">
              <span className='text-blue-600 underline'>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;