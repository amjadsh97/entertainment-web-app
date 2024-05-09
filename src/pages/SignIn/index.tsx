import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, User} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import app from "../../firebase";
import {logo} from "../../assets";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
    setErrors({...errors, [name]: value ? '' : `Please enter your ${name}`});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {email, password} = formData;

    if (!email || !password) {
      setErrors({
        email: !email ? 'Please enter your email' : '',
        password: !password ? 'Please enter your password' : '',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error: any) {
      alert("User not found!")
      console.error('Error signing in:', error.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="auth-page">
      <img src={logo} alt=""/>
      <div className='form-wrapper'>
        <h2 className='form-title'>Login</h2>
        <form onSubmit={handleSubmit} className='form'>
          <div className='input-wrapper'>
            <input
              placeholder='Email address'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}

            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className='input-wrapper'>
            <input
              placeholder='Password'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}

            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button className='submit-button' type="submit">Login to your account</button>
          <p className="login-hint">Don’t have an account?<Link to='/signup'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
