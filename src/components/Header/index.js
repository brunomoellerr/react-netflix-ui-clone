import React from 'react'
import './index.css';
import logo from '../../assets/netflix_logo.png';
import avatar from '../../assets/profile_avatar.png';

const Header = ({ black }) => {
  return (
    <header className={ black ? 'black' : '' }>
      <div className="header--logo">
        <a href="/">
          <img src={logo} alt="Netflix" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src={avatar} alt="user" />
        </a>

      </div>
    </header>
  );
}

export default Header;