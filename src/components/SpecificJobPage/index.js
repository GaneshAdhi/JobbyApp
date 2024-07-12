import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../HeaderPage'

import SpecificJobDetailComponent from '../JobSpecificCard'

import SimilarJobComponent from '../SimilarJob'

const specificJobApiContants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailRoute extends Component {
  state = {
    specificJobApiStaus: specificJobApiContants.initial,
    specificJobDetails: [],
    specificSimilarJobDetails: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({specificJobApiStaus: specificJobApiContants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')

    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateSpecificJobDetail = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        skills: each.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        title: each.title,
      }))
      const updateSimilarJob = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        specificJobDetails: updateSpecificJobDetail,
        specificJobApiStaus: specificJobApiContants.success,
        specificSimilarJobDetails: updateSimilarJob,
      })
    } else {
      this.setState({specificJobApiStaus: specificJobApiContants.failure})
    }
  }

  specificJobLoadingView = () => (
    <div className="specific-loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  specificJobSuccessView = () => {
    const {specificJobDetails, specificSimilarJobDetails} = this.state
    return (
      <>
        <SpecificJobDetailComponent specificJobDatas={specificJobDetails} />
        <SimilarJobComponent
          specificSimilarJobDetailsList={specificSimilarJobDetails}
        />
      </>
    )
  }

  specificJobFailureView = () => (
    <div className="specific-job-failure-view-main-container">
      <img
        className="specific-failure-logo"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="specific-failure-heading">Oops! Something Went Wrong</h1>
      <p className="specific-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getJobDetails}
        className="specific-failure-btn"
      >
        Retry
      </button>
    </div>
  )

  renderViewJob = () => {
    const {specificJobApiStaus} = this.state
    switch (specificJobApiStaus) {
      case specificJobApiContants.inprogress:
        return this.specificJobLoadingView()
      case specificJobApiContants.success:
        return this.specificJobSuccessView()
      case specificJobApiContants.failure:
        return this.specificJobFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-specific-main-container">
        <Header />
        {this.renderViewJob()}
      </div>
    )
  }
}
export default JobDetailRoute
