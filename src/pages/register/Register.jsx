import './register.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  let [username,setUsername]=useState("") ;
  let [password,setUserPassword]=useState("") ;
  let [email,setUserEmail]=useState("") ;
  let [error,setError]=useState(false) ;
  let [success,setSuccess]=useState(false) ;
  let [checkFieldValue,setFieldValue]=useState(false) 
let  formHandler =async(e)=> {
  e.preventDefault() 
    setFieldValue(false) 
  if (username!=='' && password!=='' && email!=='') {
    setError(false) 
  try{
      // let res=await axios.post('/auth/register',{
      //   username,
      //   password,
      //   email
      // })
      let res=await axios.post('https://mernbackend-h4ns.onrender.com/mernBackend/auth/register',{
        username,
        password,
        email
      })
      // console.log('response',res)
      res && window.location.replace('/login');
      setSuccess(true)
  }catch(err){
    setSuccess(false)
setError(true) 
  }
  }
  else{
    setSuccess(false)
    setError(false) 
    setFieldValue(true) 
  }
  
  }
  return (
    <div className='register'>
        <button className='loginAccount'><Link to='/login' className='link'>Login</Link></button>
      <form action="" className="registerForm" onSubmit={formHandler}>
      <div className="formTitle">Create An Account</div>
        <input type="text" placeholder='Enter New UserName'
        onChange={(e)=>setUsername(e.target.value)}
        />
        <input type="email" placeholder='Enter New Email'
            onChange={(e)=>setUserEmail(e.target.value)}
        />
        <input type="password" placeholder='Enter New Password'
            onChange={(e)=>setUserPassword(e.target.value)}
        />
        <button className="registerBtn" type='submit' >SingUp</button>
      {checkFieldValue && <span style={{color:"wheat",marginTop:"10px"}}>All Fields Required</span>}
      {error && <span style={{color:"wheat",marginTop:"10px"}}>Something Went Wrong</span>}
      {success && <span style={{color:"black",marginTop:"10px"}}> Account Created Successfully</span>}
      </form>
    </div>
  )
}
