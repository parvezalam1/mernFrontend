import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import './sidebar.css';

export default function Sidebar() {
  const [cats,setCasts]=useState([]);
  useEffect(()=>{
const fetchData=async ()=>{
  let res=await axios.get('https://mernbackend-h4ns.onrender.com/category');
  setCasts(res.data)
}
fetchData()
  },[]);
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <div className="sidebarTitle">
          About Me
        </div>
        <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ybmluZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" className='sidebarImage' />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod corrupti
          nobis repellendus ipsam. Obcaecati, minus ex. Voluptates magni asperiores sapiente.</p>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>

        <ul className="ulList">
          {cats.map((c)=>(

            <li className='ulItem'>
              <Link to={`https://mernbackend-h4ns.onrender.com/?cat=${c.category}`} className='link'>{c.category}</Link></li>
          )
          
          )
          
          }
            
        </ul>
      </div>
      <div className="sidebarItem">
      <div className="sidebarTitle">FOLLOW ME</div>
      <div className="sidebarSocial">
      <i class="fa-brands fa-square-facebook"></i>
        <i class="fa-brands fa-square-instagram"></i>
        <i class="fa-brands fa-square-twitter"></i>
      </div>
      </div>
    </div>
  )
}
