import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'


function ForgotPassword() {

  const [email, setEmail] = useState('');
  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email Sent Succesfully');
    } catch (error) {
      
      toast.error('Could sent the email try again');
    }
  }


  
  return (
    <div className="pageContainer">

      <header className="pageHeader">Forgot Password</header>

      <main>
        <form onSubmit={onSubmit}>

          <input 
            type="email"
            placeholder='Email'
            onChange={onChange}
            id='email'
            value = {email}
            className = "emailInput"
          />

          < Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width ='34px'
                height= '34px'/>
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
