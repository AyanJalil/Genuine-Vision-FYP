import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { signUpAuth } from '../../context/AuthProvider'

const LoginForm = () => {

    const login = useContext(signUpAuth);
    const navigate = useNavigate();

    const { register,formState: { errors }, handleSubmit, reset } = useForm()

    const onSubmit = (data) => {

      login.setLoginInfo({
        Username: data.username,
        password: data.password,
      })

      let validUser = false;
      let CInfo = {};

      for(var i = 0; i<login.signUpInfo.length; i++){
        if(data.username === login.signUpInfo[i].Username && data.password === login.signUpInfo[i].password){
          login.setUser(true);
          validUser = true;
          CInfo = {
            username: login.signUpInfo[i].Username,
            fullname: login.signUpInfo[i].Fullname,
            email: login.signUpInfo[i].Email
          }
          login.setCInfo(CInfo);
          console.log("CInfo set:", CInfo);
          navigate("/deepfake-detection");
          break;
        }
      }

      if(!validUser){
        alert("Invalid Credentials");
      }

      reset();
    };
    
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
    </div>
  )
}

export default LoginForm
