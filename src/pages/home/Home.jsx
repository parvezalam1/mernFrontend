import Posts from '../../components/posts/Posts';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import axios from 'axios'
import { useState } from 'react';
import { useMemo } from 'react';
// import {BASE_URL} from '../../config';
export default function Home() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(false);
  const [temp,setTemp]=useState(0)
  const [offset, setOffset] = useState(0);
  // const [tempArray,setTempArray]=useState([]);

  //   useEffect(()=>{
  //   const fetchPosts=async ()=>{
  //     const res=await axios.get('/posts');
  //    totalPage(res.data.length/2);
  //   console.log('total Length:',page)
  //   }
  //   fetchPosts();
  // },[page]);


  // useEffect(()=>{
  //   const fetchPosts=async ()=>{
  //     let res=[];
  //     location.state!==null?res= await axios.post('/posts/title',{title:location.state}):res=await axios.get(`/posts`);
  //     res.data.length===0?setMessage(true):setMessage(false);
  //     setPosts(res.data)
  //   }
  //   fetchPosts();

  // },[location.state]);
let tempArray=[];
  useMemo(() => {
    const fetchPosts = async () => {
      let res = [];
      location.state !== null ? res = await axios.post('/posts/title', { title: location.state }) : res = await axios.post(`/posts/pa`, { offset: offset });
      res.data.length === 0 ? setMessage(true) : setMessage(false);
      res.data.length === 2 ? setPosts(res.data[0]) : setPosts(res.data);
       setTemp(res.data[1])
  
    }
    fetchPosts();
    
  }, [location.state, offset]);
  let i=1;
  while( temp>=i) {
    tempArray.push(i)
   i++;
 }
 console.log('temparray',tempArray)
  let allList = document.querySelectorAll('#pageUl li');
  allList.forEach((item) => {
    item.addEventListener('click', () => {
      setOffset(item.innerHTML - 1)
    })
  })
  return (
    <>
      {location.state === null ? <Header /> : null}
      <div className='home'>
        <div className='context-box' >
<>
          <Posts posts={posts} />
          {message && <h1>Record Not Found</h1>}
          </>
          <ul id='pageUl'>
            
            {tempArray.map(i =>
              <li>{i}</li>

            )}
          </ul>
        </div>
        <Sidebar />

      </div>

    </>
  )
}
