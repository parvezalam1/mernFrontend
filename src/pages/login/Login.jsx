import './login.css';
import {Link} from 'react-router-dom';
import { useState ,useRef,useContext} from 'react';
import {Context} from '../../contextApi/Context'
import axios from 'axios';
export default function Login() {
  let {dispatch,isFetching}=useContext(Context)
  const [emptyInputError,setInputError]=useState(false)
  const [up,setUp]=useState('');
  let [successs,setSuccess]=useState(false);
  let userRef=useRef();
  let passwordRef=useRef();
const loginHandler=async(e)=>{
  e.preventDefault();
  if(userRef.current.value!=='' && passwordRef.current.value!==''){
    setInputError(false)
    dispatch({type:"LOGIN_START"});
    try{
      let res=await axios.post('https://mernbackend-hatq.onrender.com/routes/auth/login',{
        username:userRef.current.value,
        password:passwordRef.current.value
      });
      setUp('')
      console.log(res.data)
      setSuccess(true);
      setTimeout(()=>{

        dispatch({type:"LOGIN_SUCCESS",user:res.data})
      },2000)
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      setUp('username or password incurrect')
    }

  }else{
    setInputError(true)
  }
}
  return (
    <div className='login'>
          <button className='registerAccount'><Link className='link' to='/register'>Register</Link></button>
      <form action="" className="loginForm" onSubmit={loginHandler}>
      <div className="formTitle">Sign In Your Account</div>
        <input type="text" placeholder='Enter Email Or UserName'  ref={userRef}/>
        <input type="password" placeholder='Enter Your Password' ref={passwordRef}
        />
        <button className="loginBtn" type='submit' disabled={isFetching}>Login</button>
        {successs && <h3 
        style={{color:"white",padding:"3px",backgroundColor:"black",textAlign:"center",width:"100%",marginTop:"5px"}}>
          Login Success</h3>}
        {emptyInputError && <span style={{color:"darkblue"}}>All fields Required</span>}
        {setUp && <span>{up}</span>}
      </form>
    </div>
  )
}
