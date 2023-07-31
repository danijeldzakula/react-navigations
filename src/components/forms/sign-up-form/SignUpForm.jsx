import React, { useMemo } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const formSchema  = yup.object().shape({
  firstName: yup.string().required('First Name is a required field.'),
  lastName: yup.string().required('Last Name is a required field.'),
  email: yup.string().nullable().email('Must be a valid email').max(255).required('Email is a required field.'),
  age: yup.number().min(18).max(150).required('Please Enter your Age.'),
  zipCode: yup.string().required('Zip Code is a required field.').matches(/^[0-9]{5}$/, 'Must be exactly 5 digits'),
  sex: yup.mixed().oneOf(['male', 'female']).required('Sex is a required field.'),
  cities: yup.string().required('Cities is a required field.'),
  password: yup.string().required('Password is a required field.').min(4, "Password length should be at least 4 characters"),
  search: yup.string(),
  confirmPassword: yup.string().required('Confirm Password is a required field.').min(4, "Confirm Password length should be at least 4 characters").oneOf([yup.ref("password")], "Passwords do not match")
}).required();

export default function SignUpForm(props) {
  const { register, handleSubmit, reset, watch, trigger, setValue, formState:{ errors } } = useForm({
    mode: "onBlur", // onTouched
    resolver: yupResolver(formSchema),
    defaultValues: useMemo(() => {
      return props.initialFormState;
    }, [props.initialFormState])
  });

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>

      {/* <div className='form-group'>
        <label className='label' htmlFor='firstName'>First Name:</label>
        <input {...register("firstName", { required: true })} id='firstName' placeholder='First Name' className='input' aria-invalid={errors.firstName ? "true" : "false"}  />
        <p className='text-error'>{errors.firstName?.message}</p>
      </div>

      <div className='form-group'>
        <label className='label' htmlFor='lastName'>Last Name:</label>
        <input {...register("lastName", { required: true })} id='lastName' placeholder='Last Name' className='input' aria-invalid={errors.lastName ? "true" : "false"}  />
        <p className='text-error'>{errors.lastName?.message}</p>
      </div>      

      <div className='form-group'>
        <label className='label' htmlFor='email'>Email:</label>
        <input {...register("email", { required: true })} id='email' placeholder='Email' className='input' aria-invalid={errors.email ? "true" : "false"} />
        <p className='text-error'>{errors.email?.message}</p>      
      </div> 

      <div className='form-group'>
        <label className='label' htmlFor='password'>Password:</label>
        <input {...register("password", { required: true })} id='password' placeholder='Password' className='input' aria-invalid={errors.password ? "true" : "false"} />
        <p className='text-error'>{errors.password?.message}</p>      
      </div>

      <div className='form-group'>
        <label className='label' htmlFor='confirmPassword'>Confirm Password:</label>
        <input {...register("confirmPassword", { required: true })} id='confirmPassword' placeholder='Confirm Password' className='input' aria-invalid={errors.confirmPassword ? "true" : "false"} />
        <p className='text-error'>{errors.confirmPassword?.message}</p>      
      </div>


      <div className='form-group'>
        <label className='label' htmlFor='age'>Age:</label>
        <input {...register("age", { required: true })} id='age' placeholder='Age' className='input' aria-invalid={errors.age ? "true" : "false"} />
        <p className='text-error'>{errors.age?.message}</p>
      </div>

      <div className='form-group'>
        <p className='label'>Sex:</p>

        <div className='wrapper' aria-invalid={errors.sex ? "true" : "false"}>
          {[{_id: 1, value: 'male', label: 'Male'}, {_id: 2, value:'female', label: 'Female'}].map(item => {
            return (
              <div key={item._id} className='form-group form-group-radio'>
                <input {...register("sex", { required: true })} type='radio' value={item.value} id={item._id} className='radio' />
                <label className='label' htmlFor={item._id}>{item.label}</label>
              </div>
            )
          })}
        </div>

        <p className='text-error'>{errors.sex?.message}</p>
      </div>

      <div className='form-group'>
        <label className='label' htmlFor='zipCode'>Zip Code:</label>
        <input {...register("zipCode", { required: true })} id='zipCode' placeholder='Zip Code' className='input' aria-invalid={errors.zipCode ? "true" : "false"} />
        <p className='text-error'>{errors.zipCode?.message}</p>      
      </div>


      <div className='form-group'>
        <p className='label'>Cities:</p>

        <div className='wrapper'>
          <select {...register("cities")} className='select' aria-invalid={errors.cities ? "true" : "false"}>
            <option value="">Choose City</option>
            {serbia && serbia.length > 0 && serbia.map((item) => {
              const { city, zip } = item;
              return <option key={city + zip} value={item.city}>{item.city}</option>
            })}
          </select>
        </div>

        <p className='text-error'>{errors.cities?.message}</p>
      </div>

      <button type="submit" className='btn btn-primary'>Sign Up</button>
      <button type="button" className='btn btn-primary-outline' onClick={() => reset()}>
        <span className='inner'>Reset</span>
      </button> */}
    </form>      
  )
}