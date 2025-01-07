import React, {useContext} from 'react'
import { useForm } from "react-hook-form"
import { signUpAuth } from '../../context/AuthProvider'

const UpdatePassword = () => {

    const {signUpInfo, CInfo} = useContext(signUpAuth)
    const { register,formState: { errors }, handleSubmit, reset} = useForm()

        const onSubmit = (data) => {
          for(var i=0; i<signUpInfo.length ; i++){
              if(data.password.length < 8){
                alert("Password must be above 8 digits");
                return;
              }
              if(signUpInfo[i].Username == CInfo.username){
                  signUpInfo[i].password = data.password;
              }
          }
          reset();
        }
  return (
    <>
    <form className='space-x-2' onSubmit={handleSubmit(onSubmit)}>
        <input className='p-1 outline-none text-black rounded-md my-2' type='text' {...register("password", { required: true})} />
        <input className='px-2 py-1 rounded-lg border-1 navitem bg-red-500' type="submit" value="Update" />
        <br/>
        {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
    </form>
    </>
  )
}

export default UpdatePassword
