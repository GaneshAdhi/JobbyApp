import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaHome, FaBriefcase} from 'react-icons/fa'

import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const logoutCookieRemove = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar-main-container">
      <Link to="/">
        <img
          className="logo-web"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="icon-card-container">
        <Link to="/">
          <li>
            <FaHome className="logo-link" />
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <FaBriefcase className="logo-link" />
          </li>
        </Link>
        <button
          onClick={logoutCookieRemove}
          className="log-btn-icon"
          type="button"
        >
          <FiLogOut aria-label="logoutButton" className="logo-link" sss />
        </button>
      </ul>
      <div className="icon-card-link-container">
        <ul className="link-name-card">
          <Link to="/">
            <li className="name-links">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="name-links">Jobs</li>
          </Link>
        </ul>
        <button
          onClick={logoutCookieRemove}
          className="logout-button-name"
          type="button"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
