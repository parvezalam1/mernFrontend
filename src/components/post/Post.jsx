import './post.css';
import {Link} from 'react-router-dom'
export default function Post({post}) {
  let path="https://mernbackend-hatq.onrender.com/images/";
  let path2="https://mernbackend-hatq.onrender.com/mernBackend/images/";

  return (
    <div className='post'>
      <div className="postItem">
        {post.photo &&
      <img  src={path+post.photo} className='postImage' alt="not" />
      } 
        {post.photo &&
      <img  src={path2+post.photo} className='postImage' alt="not" />
      } 
        <div className="postCategory">
          <ul className='postCategoryList'>
            {post.categories.map(c=>
            <li className='postCategoryListItem'>{c.category}</li>
              )}
          </ul>
        </div>
        <div className="postTitle">
          <Link to={`/post/${post._id}`} className='link'>
          <b>{post.title}</b>
          </Link>
        </div>
        <div className="postDescription">
        {post.description}
        </div>
        <div className="postTime"><span>Publish</span><span>{new Date(post.createdAt).toDateString()}</span></div>
      </div>
    </div>
  )
}
