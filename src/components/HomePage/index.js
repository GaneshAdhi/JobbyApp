import './index.css'

import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../HeaderPage'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-main-container">
        <Header />
        <div className="home-small-card">
          <h1 className="home-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="description-home">
            Millions of people are searching for jobs,salary
            informations,company reviews find the job that fits your abilities
            and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-job-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
