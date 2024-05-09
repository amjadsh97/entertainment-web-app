import React from 'react';
import {iconNavBookmark, iconNavHome, iconNavMovies, iconNavTVSeries, imageAvatar, logo} from "../../assets";
import {Link, NavLink, NavLinkProps, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      navigate("/signin")
    }).catch((error) => {
      console.log(error)
    });
  }

  // @ts-ignore
  return (
    <header className="header">
      <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
        <img src={logo} alt=""/>
      </NavLink>

      <nav className="nav-items">
        <ul className='list-items'>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
              <img src={iconNavHome} alt=""/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({isActive}) => isActive ? "active" : ""}>
              <img src={iconNavMovies} alt=""/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tvseries" className={({isActive}) => isActive ? "active" : ""}>
              <img src={iconNavTVSeries} alt=""/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks" className={({isActive}) => isActive ? "active" : ""}>
              <img src={iconNavBookmark} alt=""/>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="user-avatar">
        <img src={imageAvatar} alt=""/>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </header>
  );
};

export default Header;
