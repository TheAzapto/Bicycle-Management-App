import React, { useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize Firebase
  }, []);


  const handleGoogleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();
  
        // Sign in with Google popup
        const result = await signInWithPopup(auth, provider);
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
  
        // The signed-in user info.
        const user = result.user;
        console.log('Google Login Success:', user);
        navigate('/home');
    } catch (error) {
        console.error('Google Login Error:', error);
    }
  };

  return (
    <div className="login-container">
        <div className="login-form">
            <h1 className='login-heading'>Login</h1>
            <button className="login-button" onClick={handleGoogleLogin}>
                Sign in with Google
            </button>
        </div>
    </div>
  );
}

export default Login;
