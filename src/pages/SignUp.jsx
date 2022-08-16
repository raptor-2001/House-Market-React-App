import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {getAuth, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'


function SignUp() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  })

  const {name,email, password} = formData;
 
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword (
        auth,
        email,
        password
      ) 

      const user = userCredential.user;
      
      updateProfile(
        auth.currentUser,
        {
          displayName: name
        }
      )

      // For adding the database into the db

      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong try again')
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
          <p className="pageHeader">Welcome..!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input 
              type="name" 
              className="nameInput" 
              onChange={onChange}
              placeholder = "Name"
              id='name'
              value={name}
            />
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
            <p className="signInText">Sign Up</p>
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

        <Link to='/sign-in'className="registerLink">
          Sign In Instead
        </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
