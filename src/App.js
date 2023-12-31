import Home from "./pages/home/Home";
import Top from "./components/top/Top";
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import WritePost from "./pages/write/WritePost";

import { useContext } from "react";
import { Context } from "./contextApi/Context";
// import SinglePost from "./components/singlePost/SinglePost";

function App() {
  let {user}=useContext(Context)
  return (
<Router>
  <Top />
  <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route path="/register" element={user?<Home />:<Register />}></Route>
    <Route path="/login" element={user? <Home />:<Login />}></Route>
 <Route path="/write" element={user?<WritePost /> : <Login /> }></Route>
 <Route path="/settings" element={user?<Settings /> : <Register /> }></Route>
 <Route path="/post/:id" element={<Single />}></Route>
  </Routes>
</Router>

  );
}

export default App;
