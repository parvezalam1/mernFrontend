import './posts.css';
import Post from '../post/Post';
// import { useState } from 'react';
export default function Posts({posts}){
  return (
    <div className='posts'>
   {posts.map(p=>
   <Post post={p}/>
   )}
    </div>
  );
}
