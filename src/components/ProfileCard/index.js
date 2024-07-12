import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

const profileConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Profile extends Component {
  state = {profileApiStatus: profileConstant.initial, profileDetail: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileConstant.inprogress})

    const url = 'https://apis.ccbp.in/profile'

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const profileDetails = data.profile_details

      const dataConvertSnakeToCamel = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileApiStatus: profileConstant.success,
        profileDetail: dataConvertSnakeToCamel,
      })
    } else {
      this.setState({
        profileApiStatus: profileConstant.failure,
      })
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="button-container">
      <button
        type="button"
        onClick={this.getProfileDetails}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {profileDetail} = this.state
    const {name, profileImageUrl, shortBio} = profileDetail
    return (
      <div className="profile-card-container-main">
        <img className="profile-logo" alt={name} src={profileImageUrl} />
        <h1 className="name-heading">{name}</h1>
        <p className="short-bio-description">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileConstant.success:
        return this.successView()
      case profileConstant.failure:
        return this.failureView()
      case profileConstant.inprogress:
        return this.loadingView()
      default:
        return null
    }
  }
}
export default Profile
