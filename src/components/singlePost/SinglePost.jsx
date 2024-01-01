import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation ,Link } from 'react-router-dom';
import {Context} from '../../contextApi/Context'
import { useContext } from "react";
import './singlePost.css';
 export default function SinglePost() {
let {user}=useContext(Context) 
let [getPost,setGetPost]=useState({});
let [updateMode,setUpdateMode]=useState(false);
let [updateTitle,setUpdateTitle]=useState('');
let [updateDes,setUpdateDes]=useState('');
let [updateStatus,setUpdateStatus]=useState(false);
let [updatePicture,setUpdatePicture]=useState('');
let [deleteStatus,setDeleteStatus]=useState(false);

let [message,setUpdateMessage]=useState('');
const location = useLocation();
let path=location.pathname.split("/")[2];
useEffect(()=>{
  let getPost=async()=>{
    let res=await axios.get('https://mernbackend-hatq.onrender.com/posts/'+path);
    setGetPost(res.data)
  }
  getPost()
},[path])
let imagePath="https://mernbackend-hatq.onrender.com/images/";
if(getPost.username===user.username){
  imagePath+=getPost.photo
} 
const singlePostDelHandler=async(delId)=>{
  setDeleteStatus(true)
try{
  await axios.delete(`https://mernbackend-hatq.onrender.com/posts/${delId}`,{data:{username:user.username}});
  setDeleteStatus(false)
  alert('user post has been deleted successfully')
  setTimeout(()=>{

    window.location.replace('/');
  },1500)
}catch(err){
  console.log(err.name)
}
}

function updatePostHandler(){
  setUpdateMode(true)
  setUpdateTitle(getPost.title)
  setUpdateDes(getPost.description)
}
const updatePostSumbit=async(e)=>{
  e.preventDefault()
  let updateUserPost={
    username:user.username,
    title:updateTitle,
    description:updateDes,

  }
  const data=new FormData();
  if(updatePicture!==''){
    let file_extension=updatePicture.type.split('/');
    const filename= Date.now()+'.'+file_extension[1];
    data.append('name',filename);
    data.append('file',updatePicture);
    updateUserPost.photo=filename
  }
  setUpdateStatus(true)
  try{
    let res=await axios.put(`https://mernbackend-hatq.onrender.com/posts/${getPost._id}`,updateUserPost);
    setUpdateMessage(res.data);
    if(res.data==='post update successfully'){
      await axios.post('https://mernbackend-hatq.onrender.com/upload',data);
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }
  }catch(err){
      console.log(err)
  }
  // else{
  //   try{
  //    let  res=await axios.put(`/posts/${getPost._id}`,
  //     {
  //       username:user.username,
  //       title:updateTitle,
  //       description:updateDes
      
  //     });
  //     setUpdateMessage(res.data);
     
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  setUpdateStatus(false)
  
}
  return (
    <div className='singlePost'>
     
    <img className='postImage' src={imagePath} alt="" />
      
   <div className="actionPost">
   <i className="fa fa-pencil-square pencil" aria-hidden="true"  onClick={updatePostHandler}></i>
   <i className="fa fa-trash " aria-hidden="true" disabled={deleteStatus} onClick={()=>singlePostDelHandler(getPost._id)}></i>
   </div>

   {/* post update code start here */}

   {updateMode &&
   
   <form className='updatePost' onSubmit={updatePostSumbit}>
      <h3 style={{backgroundColor:"crimson",color:"white",width:"100%",padding:"5px",textAlign:"center"}}>Please Update Your Post Here</h3>
       {updatePicture && 
            <img className='writePostImage' src={URL.createObjectURL(updatePicture)} alt="" />
            }
      <label htmlFor="postFile"><i class="fa-solid fa-plus"></i></label>
                    <input type="file"  id="postFile" style={{display:"none"}} 
                    onChange={(e)=>setUpdatePicture(e.target.files[0])}
                     />
    <input type='text' value={updateTitle} onChange={(e)=>setUpdateTitle(e.target.value)} placeholder="Input Title Here"/>
    <textarea value={updateDes} onChange={(e)=>setUpdateDes(e.target.value)}  placeholder='Input Description Here'></textarea>
    <button type='submit' disabled={updateStatus}>Update Post</button>
      <h3 style={{backgroundColor:"green",color:"white",width:"100%",padding:"",textAlign:"center",marginTop:"5px"}}>{message}</h3>
    </form>
   
   }

{/* post update code end here */}

   <div className="postTitle">{getPost.title}</div>
    <div className="postAuthor">
      <span className='postAuthorName'>Author: 
      <Link to={`/?name=${getPost.username}`} className='link'>{getPost.username}</Link> </span>
      <span className='postTime'>{new Date(getPost.createdAt).toDateString()}</span>
    </div>
    <div className="postDes">
      {getPost.description}
    </div>
    </div>
  )
}
