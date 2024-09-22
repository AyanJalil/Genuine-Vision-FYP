import React from 'react'
import { useForm } from "react-hook-form"
import { Link} from 'react-router-dom'

const SignUpForm = () => {

    const { register,formState: { errors }, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)

  return (
    <div className='flex justify-between'> 
      <div className='h-screen gradient-signup signupform-width flex justify-center items-center px-4 side-border-detect'>
        <form className='side-border-detect px-8 py-6 w-96 flex flex-col space-y-2 bg-black bg-opacity-50 rounded-lg font-semibold' onSubmit={handleSubmit(onSubmit)}>

            <p className='text-center text-2xl '>Signup</p>
            <p className='text-center text-xl'><Link to='/'>Genuine Vision</Link></p>

            <label>Enter Username</label>
            <input className='p-1 outline-none text-black rounded-md' type='text' {...register("firstName", {required: true})} />
            {errors.firstName && <span className='text-sm text-red-600'>This field is required</span>}

            <label>Enter Fullname</label>
            <input className='p-1 outline-none text-black rounded-md' type='text' {...register("fullname", {required: true})} /> 
            {errors.fullname && <span className='text-sm text-red-600'>This field is required</span>}

            <label>Enter Email</label>
            <input className='p-1 outline-none text-black rounded-md' type='email' {...register("email", {required: true})} /> 
            {errors.email && <span className='text-sm text-red-600'>This field is required</span>}

            <label>Enter Password</label>
            <input className='p-1 outline-none text-black rounded-md' type='password' {...register("password", {required: true})} /> 
            {errors.password && <span className='text-sm text-red-600'>This field is required</span>}

            <input className='font-extrabold rounded-lg border-2 navitem py-1 cursor-pointer' type="submit" />

            <p>Already have an account? <Link to="/login"><span className='text-blue-600 underline'>Login</span></Link></p>
        </form>
          
      </div>
      <div className='hidden lg:block'>
        <img className='signup-width h-full' src="public/images/a-futuristic-scene-with-a-robot-.jpeg" alt="" />
      </div>
    </div>
  )
}

export default SignUpForm
