import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../contextApi/Context';
import { useContext, useState } from 'react';
import axios from 'axios';
export default function Settings() {
  let [file, setFile] = useState(null);
  let [username, setUpdateUsername] = useState('');
  let [email, setUpdateUserEmail] = useState('');
  let [password, setUpdateUserPassword] = useState('');
  let [message, setMessage] = useState(false);
  let [success, setSuccess] = useState(false)
  let [warning,setWarning]=useState(false)
  let PF = "https://mernbackend-h4ns.onrender.com/userProfile/";
  let { user, dispatch, isFetching } = useContext(Context);
  console.log(user, isFetching)
  const updateUser = async (e) => {
    e.preventDefault()
    setSuccess(false)
    if (username === '' && email === '' && password === '') {
      setMessage(true)
    } else {
      setMessage(false)
      let updateUser = {
        username,
        email,
        password,
        exitUser:user.username,
        profilePic:user.profilePic
      }
      dispatch({ type: "UPDATE_START" })
      let newProfile;
      try {
        if (file) {
           newProfile = new FormData();
          let fileExtension = file.name.split('.');
          let makeNewImagePicture = Date.now() + '.' + fileExtension[1];
          newProfile.append('name', makeNewImagePicture)
          newProfile.append('file', file)
          updateUser.profilePic = makeNewImagePicture;
        
        }
        let res = await axios.put(`https://mernbackend-h4ns.onrender.com/users/${user._id}`, updateUser)
        if(res.data){

          try {
            await axios.post('https://mernbackend-h4ns.onrender.com/uploadProfile', newProfile)
          } catch (err) {
            console.log(err)
          }
        }
        setMessage(false)
        dispatch({ type: "UPDATE_SUCCESS", user: res.data })
        setSuccess(true)
        setTimeout(() => {
          dispatch({ type: "LOGOUT" })
        }, 2000);
      } catch (err) {
        // await fs.unlinkSync(PF+updateUser.profilePic)
        dispatch({ type: "UPDATE_FAILURE" })
        console.log('update res failed:', err)
      }
    }
  }

const deleteAccount=(e)=>{
  e.preventDefault();
   setWarning(true);
   setTimeout(async function(){

     if(window.confirm(`do you want to delete your account \n Warning if your delete your account then you loss your all data`)){
       let res = await axios.delete(`https://mernbackend-h4ns.onrender.com/users/${user._id}/${user.username}`)

       alert(res.data)
       setWarning(false)
       setTimeout(() => {
         dispatch({ type: "LOGOUT" })
        }, 1000);
        
      }
      else{
       setWarning(false)
      }
    },500)


}
  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsAction">
          <span className='updateProfile'>Update Your Profile</span>
          <span className='deleteAccount' onClick={deleteAccount}>Delete Account</span>
        </div>
        {warning && <h2 style={{backgroundColor:'silver',padding:'5px',color:'white'}}>
          <span style={{color:"red",fontSize:'25px',textDecoration:"underline",marginTop:"5px"}}>Warning</span> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
         if you delete your account then you loss your all data </h2>}
        <h2 className='profileText'>Profile Picture</h2>

        <div className="profilePicture">
          <img className='userPicture' src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt={user.profilePic} />
          <label htmlFor='fa-user'><i class="fa-solid fa-user"></i></label>
          <input type='file' id='fa-user' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}></input>
        </div>
        <form className="userForm" onSubmit={updateUser}>
          <caption className='caption'>Enter Your Details</caption>
          <label htmlFor='userName'>userName</label>
          <input type="text" id='userName' placeholder='Enter UserName '
            onChange={(e) => setUpdateUsername(e.target.value)}
          />
          <label htmlFor='userEmail'>user Email</label>
          <input type="email" id='userEmail' placeholder='Enter User Email'
            onChange={(e) => setUpdateUserEmail(e.target.value)}
          />
          <label htmlFor='userPassword'>user Password</label>
          <input type="password" id='userPassword' placeholder='Enter User Password '
            onChange={(e) => setUpdateUserPassword(e.target.value)}
          />
          <h3>{isFetching && "Please Wait ..."}</h3>
          <h3>{success && "Profile Update Successfully"}</h3>
          {message && <h3 style={{ backgroundColor: "red", textAlign: "center", padding: "3px" }}>All Fields Required</h3>}
          <button className="updateData" type='submit' disabled={isFetching}>Update</button>
        </form>
      </div>

      <Sidebar />
    </div>

  )
}
