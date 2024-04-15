import "./App.css";

import "./index.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Alert from "./components/Alert";
import Header from "./components/Header";
import {useSelector, useDispatch} from 'react-redux'
import Home from "./pages/Home";
import { useEffect } from "react";
import {refreshToken} from './redux/actions/authActions';
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import PrivateRouter from "./utils/PrivateRouter";
import Profile from "./pages/Profile";

function App() {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(refreshToken())
},[dispatch])

  return (
  <div className="App">
    <Router>
      <Alert/>
      { auth.token && <Header/> }
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          {auth.token ? <Home /> : <Login/>}
          </Route>
       <Route exact path="/login">
        <Login />
        </Route>
        
        <PrivateRouter exact path="/message">
          <Messages />
        </PrivateRouter>

        <PrivateRouter exact path="/explore">
          <Explore />
        </PrivateRouter>

        <PrivateRouter exact path="/notification">
          <Notifications />
        </PrivateRouter>
                
        <PrivateRouter exact path="/post/:id">
          <Post/> 
        </PrivateRouter>
      
        <PrivateRouter exact path="/profile/:id">
          <Profile/> 
        </PrivateRouter>

        <Route> <NotFound/> </Route>

      </Switch>
    </Router>
    
</div>
  );
}

export default App;
