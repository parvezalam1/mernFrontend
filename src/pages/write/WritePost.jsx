import { useState } from "react";
import "./writePost.css";
import {Context} from '../../contextApi/Context'
import { useContext } from "react";
import axios from "axios";
import { useRef } from "react";
export default function WritePost() {
let {user}=useContext(Context)
    let [title,setTitle]=useState();
    let [description,setDescription]=useState();
    let [file,setFile]=useState(null);
    let [error,setError]=useState(false);
    let [fileError,setFileError]=useState(false);
    let [postUpload,setPostUpload]=useState(false);
    var [titleFound,titleMatch]=useState(false);
    var [descFound,descMatch]=useState(false);
    let [requestStatus,setRequestStatus]=useState(false);
    let titleRef=useRef();
    let descriptionRef=useRef();
    const postWriteHandler=async (e)=>{
        e.preventDefault();
        let newPost={
            username:user.username,
            title,
            description
        }
        if(title && description){
            if(file){
                    const data=new FormData();
        let file_extension=file.type.split('/');
        const filename= Date.now()+'.'+file_extension[1];
        data.append('name',filename);
        data.append('file',file);
        newPost.photo=filename;
        setError(false);
        setFileError(false)
               try{
                setRequestStatus(true)
           let res= await axios.post('https://mernbackend-hatq.onrender.com/posts',newPost)
           console.log(res.data)
           if(res.data==='title_match'){
            setPostUpload(false)
            titleMatch(true)
            descMatch(false)
           }else if(res.data==='desc_match'){
                    descMatch(true)
            titleMatch(false)
                    setPostUpload(false)
           }else{
            setPostUpload(true)
            titleMatch(false)
            descMatch(false)
            window.location.replace('/post/'+res.data._id)
            try{
                await axios.post('https://mernbackend-hatq.onrender.com/upload',data);
            }catch(err){}
            
           }
           setRequestStatus(false)
        }catch(err){
        
                console.log(err)
        }
            
            }else{
                setFileError(true)
                setError(false)
            }
        }
        else{
            if(!description){
                descriptionRef.current.focus();
            } if(!title){
                titleRef.current.focus()
            }
                setError(true);
                setFileError(false)
        }
    }
    return (
        <div className="writePost">
            {file && 
            <img className='writePostImage' src={URL.createObjectURL(file)} alt="" />
            }
            <form action="" className="frm" onSubmit={postWriteHandler}>
                    {error && <h3 style={{backgroundColor:"red" ,width:"50%",padding:"5px",textAlign:"center",
                    color:"#fff"}}
                    >All Fields Required</h3>}
                      {fileError && <h3 style={{backgroundColor:"red" ,width:"50%",padding:"5px",textAlign:"center",
                    color:"#fff"}}
                    >Post Image Must Be Include</h3>}
                    {postUpload && <h3 style={{backgroundColor:"green" ,width:"50%",padding:"5px",textAlign:"center",
                           color:"#fff"}}
                           >Post Uploaded Successfully</h3>}
                            {titleFound && <h3 style={{backgroundColor:"green" ,width:"50%",padding:"5px",textAlign:"center",
                           color:"#fff"}}
                           >Post Title Must Be Diffrent</h3>}
                         {descFound && <h3 style={{backgroundColor:"green" ,width:"50%",padding:"5px",textAlign:"center",
                           color:"#fff"}}
                           >Post Description Must Be Diffrent</h3>}
                <div className="wrapper">
                    <label htmlFor="postFile"><i class="fa-solid fa-plus"></i></label>
                    <input type="file"  id="postFile" style={{display:"none"}} 
                    onChange={e=>setFile(e.target.files[0])}
                    />
                    <input className="titleTag" type="text" ref={titleRef} placeholder="Write Your Title Here" 
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                    <button type="submit" className="postPublish" disabled={requestStatus}>Publish</button>
                </div>
                <div className="writePostDes">
                    <textarea placeholder="Write Your Story Here" type='text' ref={descriptionRef} className="postStory"
                    onChange={(e)=>setDescription(e.target.value)}
                    />
             
                
             
                
                
                </div>
            </form>
        </div>
    )
}
