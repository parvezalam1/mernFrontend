import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Top.css';
import { Link } from 'react-router-dom';
import { Context } from "../../contextApi/Context";
export default function Top() {
  let FP = "https://mernbackend-h4ns.onrender.com/userProfile/";
  let { dispatch, user } = useContext(Context)
  const navigate=useNavigate();
  let [searchStatus, setSearchStatus] = useState(null)
  const ulListShow=()=>{
    document.querySelector('.ulitem').style.display = 'block';
  }
  const ulListHide=()=>{
    document.querySelector('.ulitem').style.display = 'none';
  }
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" })
  }
  const searchHandler = async () => {
    setSearchStatus(true)
    document.querySelector('.fa-magnifying-glass').style.display = 'none';
    document.querySelector('.fa-searchengin').style.display = 'block';
  }
  const searchBackHandler = async () => {
    setSearchStatus(false)
    document.querySelector('.fa-magnifying-glass').style.display = 'block';
    document.querySelector('.fa-searchengin').style.display = 'none';
  }

  const itemsSearchHandler= async(e)=>{
    navigate('/',{state:e.target.value})
  }
  return (
    <>
    <div className="header">
      <div className='top'>
        <div className="topleft">
          <i class="fa-brands fa-square-facebook"></i>
          <i class="fa-brands fa-square-instagram"></i>
          <i class="fa-brands fa-square-twitter"></i>
        </div>
        <div className="topcenter">
        

          <ul className="ulitem">
          <i class="fa fa-times" aria-hidden="true" onClick={ulListHide}></i>
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/about'>About</Link></li>
            <li><Link className='link' to='/settings'>Contact Us</Link></li>
            <li><Link className='link' to='/write'>Write</Link></li>
            {user && <li className='link' onClick={logoutHandler}>Logout</li>}
          </ul>
        </div>
        <div className="topright">
          {
            searchStatus && <input type='search' placeholder='Search Post Here' id='search' onKeyUp={itemsSearchHandler}></input>
          }
          <i className="fa-solid fa-magnifying-glass topsearch" onClick={searchHandler}></i>
          <i class="fa-brands fa-searchengin " onClick={searchBackHandler}></i>
          {
            user ? <>   <Link to='/settings'>< img src={FP + user.profilePic} alt="" className='topimage' /></Link>

              {/* <i  className="fa-solid fa-magnifying-glass-slash topsearch" onClick={searchHandler}></i> */}
            </>
              :
              <ul className="ulitem">
                <li><Link className='link' to='/register'>Sing Up</Link></li>
                <li><Link className='link' to='/login'>SingIn</Link></li>
              </ul>

          }
          <i class="fa fa-bars" aria-hidden="true" onClick={ulListShow}></i>


        </div>
      </div>
    </div>
    </>
  )
}
