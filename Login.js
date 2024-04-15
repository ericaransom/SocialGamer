import React , {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import "../styles/Login.css";
import {login} from '../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
    const initialState = {email: '', password: ''}
    const history = useHistory();
    const {auth} = useSelector(state => state)
    const [showpass, setShowpass] = useState(false);
    const [userData, setUserData] = useState({initialState});
    const dispatch = useDispatch();
    useEffect(() =>{
        if(auth.token){
            history.push('/')
        }
    })
    const {email, password} = userData;
    const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]:value})
}

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        await dispatch(login(userData));
    }

    return (
        <div className="login">
            <div className="login-container">
            <h3 className="login-header">Gamer Network</h3>
            <h6 className="login-subheader">Login</h6>
            
            <form className="login-dataform" onSubmit={handleSubmit}>
            <input 
            className="login-dataformemail" 
            type="email"
            name='email'
            value={email}
            onChange={handleChange}
            placeholder="Type your email"></input>    
            <input 
            className="login-dataformpass"
            type= {showpass ? "type" : "password"}
            placeholder="Type your password"
            value={password}
            name='password'
            onChange={handleChange}
                >

                </input>
                <small className="login-showpass"onClick={() =>setShowpass(!showpass)}> {showpass ? "Hide" : "Show" }</small>
                <button
                className="login-dataformbtn"
                type="submit" > Log In </button>
                <p className="login-small"> Create a Free Account <Link to="/register">Create HERE</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;