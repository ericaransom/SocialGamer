const valid = ({username,fullname,email,password,confirmPassword}) =>{
   const err = {}

    if(!fullname){
        err.fullname = 'Please enter your full name'
    } else if(fullname.length > 25){
        err.fullname = "length should be less than 25 characters"
    }
  
    if(!username){
        err.username = 'Please enter your user name'
    } else if(username.replace(/ /g,'').length > 25){
        err.username = "length should be less than 25 characters"
    }
    if(!email){
        err.email = 'Please enter your email address'
    } else if(!validateEmail(email)){
        err.email = "invalid email format"
    }
    if(!password){
        err.password = 'Please enter your password'
    } else if(password.length < 6){
        err.password = "length must be at least 6 characters"
    }
    if(password !== confirmPassword){
        err.confirmPassword = "Passwords do not match"
    }


return{
    errMsg:err,
    errLength:Object.keys(err).length
}


function validateEmail(email){
//eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}}

export default valid;