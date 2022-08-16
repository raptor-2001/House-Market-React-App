import React,{useState} from 'react'
import { toast } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'


import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'



function SignIn() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData;
 
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
          const auth = getAuth();

          const userCredential = await signInWithEmailAndPassword (
            auth,
            email,
            password
          )
          
          if(userCredential.user){
            navigate('/')
          }

        }catch (error) {
          toast.error('Wrong user credentials')
      }
    }
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className="pageHeader">Welcome Back..!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input 
              type="email" 
              className="emailInput" 
              onChange={onChange}
              placeholder = "Email"
              id='email'
              value={email}
            />
            <div className="passwordInputDiv">
            <input 
              type={showPassword ? 'text': 'password'} 
              className="passwordInput" 
              onChange={onChange}
              id='password'
              placeholder = "Password"
              value={password}
            />
            <img 
              src={visibilityIcon} 
              alt="showpassword" className="showPassword" 
              onClick={() => setShowPassword((prevState)=>{
                return !prevState;
              })}/>
            </div>

          <Link 
            to='/forgot-password'
            className="forgotPasswordLink">
              Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon 
                fill='#ffff'
                width= '36px'
                height = '36px'
              />
            </button>
          </div>
        </form>
          
        <OAuth/>

        <Link to='/sign-up'className="registerLink">
          Sign Up Instead
        </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn
