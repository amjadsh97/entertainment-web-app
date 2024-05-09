import React, {useEffect, useState} from 'react';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, User} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import app from "../../firebase";
import { logo } from "../../assets";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? '' : `Please enter your ${name}` });
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const { email, password, password2 } = formData;

    if (!email || !password || !password2) {
      setErrors({
        email: !email ? 'Please enter your email' : '',
        password: !password ? 'Please enter your password' : '',
        password2: !password2 ? 'Please repeat your password' : '',
      });
      return;
    }

    if (password !== password2) {
      setErrors({
        ...errors,
        password2: 'Passwords do not match',
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error:any) {
      alert(error.message)
      console.error('Error signing up:', error.message);
    }
  }

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
      <img src={logo} alt="" />
      <div className='form-wrapper'>
        <h2 className='form-title'>Sign up</h2>
        <form onSubmit={handleSignUp} className='form'>
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
          <div className='input-wrapper'>
            <input
              placeholder='Repeat password'
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            />
            {errors.password2 && <span className="error">{errors.password2}</span>}
          </div>
          <button className='submit-button' type="submit">Create an account</button>
          <p className="login-hint">Already have an account?<Link to={'/signin'}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
