import React from 'react'
import "../styles/Header.css";
import IconButton from "@material-ui/core/IconButton"
import HomeIcon from "@material-ui/icons/Home"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from "../redux/actions/authActions";
import {Link, useLocation} from 'react-router-dom';
import {getDataApi} from "../utils/fetchDataApi"



export const Header = () =>{
    const [search, setSearch] = useState('')
    const [users,setUsers] = useState([])
    const dispatch = useDispatch();
    const {auth} = useSelector(state=>state);
    const {pathname} = useLocation();

    useEffect(()=>{
        if(search && auth.token){
            getDataApi(`search?username=${search}`,auth.token)
            .then(res=>setUsers(res.data.users))
            .catch(err=>{
                dispatch({
                    type:'ALERT',
                    payload:{
                        error:err.response.data.msg
                    }
                })
            })
        }
    }, [search,auth.token,dispatch])
    
    
    const isActive = (pn) =>{
        console.log(pn)
        if (pn === pathname) return 'active'
    }

    return (
        <div className="header">
            <div className="header-right">
            <h3>Gaming Network</h3>
            </div>
        <form className="header-center">
            <input type="text" placeholder="Search Profiles" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <SearchIcon/>
            
        </form> 
{
            users.length>0 && users.map(user=>(
                <Link to={`profile/${user._id}`} key={user._id}>
                    <UserCard />
                </Link>
            ))
}
        <div className="header-left">
        <Link to ={`profile/${auth.user._id}`}> <div className="header-leftAvatar">
                <Avatar src={auth.user.avatar}/>
                <h4>{auth.user.fullname}</h4>
            </div>
            </Link>
            <Link to="/">
            <IconButton>
                <HomeIcon className={`${isActive('/')}`}/>
            </IconButton>
            </Link>
            <Link to="/message">
            <IconButton >
                <MessageIcon className={`${isActive('/message')}`}/>
                
            </IconButton>
            </Link>
            <Link to="/notification">
            <IconButton>
                <NotificationsIcon className={`${isActive('/notification')}`}/>
            </IconButton>
            </Link>
            <Link to="/explore">
            <IconButton>
                <ExploreIcon className={`${isActive('/explore')}`}/>
            </IconButton>
            </Link>
            <IconButton onClick={()=>dispatch(logout())}>
                <ExitToAppIcon/>
            </IconButton>
    </div>
</div>
    )
}

export default Header;