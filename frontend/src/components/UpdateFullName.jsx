import React, {useContext} from 'react'
import { useForm } from "react-hook-form"
import { signUpAuth } from '../../context/AuthProvider'

const UpdateFullName = () => {

    const {signUpInfo, CInfo} = useContext(signUpAuth)
    const { register,formState: { errors }, handleSubmit, reset} = useForm()

        const onSubmit = (data) => {
          for(var i=0; i<signUpInfo.length ; i++){
              if(signUpInfo[i].Username == CInfo.username){
                  signUpInfo[i].Fullname = data.fullname;
                  CInfo.fullname = data.fullname;
                  
              }
          }
          reset();
        }
  return (
    <>
    <form className='space-x-2' onSubmit={handleSubmit(onSubmit)}>
        <input className='p-1 outline-none text-black rounded-md my-2' type='text' {...register("fullname", { required: true})} />
        <input className='px-2 py-1 rounded-lg border-1 navitem bg-red-500' type="submit" value="Update" />
        <br/>
        {errors.fullname && <span className='text-sm text-red-600'>This field is required</span>}
    </form>
    </>
  )
}

export default UpdateFullName
