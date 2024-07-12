import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsgStatus: false,
    showErrorMsg: '',
  }

  usernameUpdate = event => {
    this.setState({username: event.target.value})
  }

  passwordUpdate = event => {
    this.setState({password: event.target.value})
  }

  successView = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
    this.setState({username: '', password: ''})
  }

  failureView = errorMsg => {
    this.setState({showErrorMsgStatus: true, showErrorMsg: errorMsg})
  }

  submitDetail = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetail = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {method: 'POST', body: JSON.stringify(userDetail)}

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.successView(data)
      this.setState({showErrorMsgStatus: false})
    } else {
      this.failureView(data.error_msg)
    }
  }

  render() {
    const {showErrorMsgStatus, showErrorMsg} = this.state
    return (
      <div className="login-page-main-container">
        <div className="login-small-card">
          <div className="web-logo-container">
            <img
              className="web-logo-style"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form onSubmit={this.submitDetail} className="form-container">
            <div className="input-card-common-container">
              <label htmlFor="userNameId" className="label-style-common">
                USERNAME
              </label>
              <br />
              <input
                onChange={this.usernameUpdate}
                placeholder="Username"
                className="input-common-style"
                id="userNameId"
                type="text"
              />
            </div>
            <div className="input-card-common-container">
              <label className="label-style-common" htmlFor="passwordId">
                PASSWORD
              </label>
              <br />
              <input
                onChange={this.passwordUpdate}
                className="input-common-style"
                placeholder="Password"
                id="passwordId"
                type="password"
              />
            </div>
            <button className="submit-btn" type="submit">
              Login
            </button>
          </form>
          {showErrorMsgStatus ? (
            <p className="error-msg">* {showErrorMsg}</p>
          ) : null}
        </div>
      </div>
    )
  }
}
export default Login
