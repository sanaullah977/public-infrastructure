import React from 'react'
import sing from '../../assets/singin.jpg.png'
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import GoogleLogin from '../../Component/Login/googleLogin';
import Swal from 'sweetalert2';


const Register = () => {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const {registerUser} = useAuth();

  const handleRegistration =(data) => {
    console.log('after Register', data);
    registerUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      
Swal.fire({
  title: " Well Done!",
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
          <div className="card-body justify-center ">
            <form onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" {...register('email',{required:true})} className="input bg-orange-50" placeholder="Email" />
              {
                errors.email?.type === 'required'&& <p className='text-red-500'>Email Is required</p>
              }
                
              
              <label className="label">Password</label>
              <input type="password" {...register('password')} className="input bg-orange-50" placeholder="Password" />
              {
                errors.password?.type === 'minLength'&& <p className='text-red-500'>Password must </p>
              }
              <div>
                <a>I already have a  Account <Link to='/login' className='text-blue-600 link link-hover'>Log In</Link></a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            </form>
            <GoogleLogin></GoogleLogin>
          </div>
          </div>
        
          <div>
            <img className=" max-h-96 rounded-3xl" src={sing} alt="" />
          </div>
          
        </div>
  )
}

export default Register
