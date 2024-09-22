import React from 'react'
import { useForm } from "react-hook-form"
import { Link} from 'react-router-dom'

const LoginForm = () => {

    const { register,formState: { errors }, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)


  return (
    <div className='flex justify-between'> 
      <div className='h-screen gradient-signup signupform-width flex justify-center items-center px-4 side-border-detect'>
        <form className='side-border-detect px-8 py-6 w-96 flex flex-col  bg-black bg-opacity-50 rounded-lg font-semibold' onSubmit={handleSubmit(onSubmit)}>

            <p className='text-center text-2xl mt-4 mb-2'>Login</p>
            <p className='text-center text-xl mb-4'><Link to='/'>Genuine Vision</Link></p>

            <label>Enter Username</label>
            <input className='p-1 outline-none text-black rounded-md my-2' type='text' {...register("username", { required: true})} />
            {errors.username && <span className='text-sm text-red-600'>This field is required</span>}

            <label>Enter Password</label>
            <input className='p-1 outline-none text-black rounded-md my-2' type='password' {...register("password", { required: true})} /> 
            {errors.password && <span className='text-sm text-red-600'>This field is required</span>}

            <p className='self-end'>Forget Password?</p>

            <input className='font-extrabold rounded-lg border-2 navitem py-1 cursor-pointer my-2' type="submit" />

            <p>Dont have an account? <Link to="/signup"><span className='text-blue-600 underline'>Signup</span></Link></p>
        </form>
          
      </div>
      <div className='hidden lg:block'>
        <img className='signup-width h-full' src="public/images/a-futuristic-scene-with-a-robot.jpeg" alt="" />
      </div>
    </div>
  )
}

export default LoginForm
