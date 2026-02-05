import React from 'react'
import sing from '../../assets/singin.jpg.png'
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import GoogleLogin from '../../Component/Login/googleLogin';
import Swal from 'sweetalert2';

const LogIn = () => {

   const { register, handleSubmit, formState: {errors} } = useForm();
  const {singInUser} = useAuth();

  

  const handleLogin =(data) => {
    console.log('after Register', data);
    singInUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      
Swal.fire({
  title: "Well Done!",
  icon: "success",
  draggable: true
});
    })
    .catch(error => {
      console.log(error)
    })

  }
  return (
  
     <div className="  flex justify-evenly items-center mt-20  ">

      <div className="card bg-orange-100 w-full max-w-sm shrink-0   ">
      <form onSubmit={handleSubmit(handleLogin)} className="card-body justify-center ">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})} className="input bg-orange-50" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" {...register('password')} className="input bg-orange-50" placeholder="Password" />
          <div>
          <a className="link link-hover">Forgot password?</a>
          <a>I have no Account <Link to='/register' className='text-blue-600 link link-hover'>Register</Link></a>
          </div>
          <button className="btn btn-neutral mt-4 -mb-4">Login</button>
        </fieldset>
      </form>
     <div className='mb-4'> <GoogleLogin></GoogleLogin></div>
      </div>
    
      <div>
        <img className=" max-h-96 rounded-3xl" src={sing} alt="" />
      </div>
      
    </div>
  
     
  )
}

export default LogIn
