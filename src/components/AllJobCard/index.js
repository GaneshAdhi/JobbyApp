import './index.css'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'

import {MdLocationOn} from 'react-icons/md'

const apiJobConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

const AllJobCards = props => {
  const {allJobsDatas, jobApiStatusDetail, getAllJobsFunction} = props
  const jobFuntion = () => {
    getAllJobsFunction()
  }

  const successView = () => {
    const allJobrenderCondition = allJobsDatas.length > 0
    return allJobrenderCondition ? (
      <ul>
        {allJobsDatas.map(each => (
          <Link key={each.id} to={`/jobs/${each.id}`}>
            <li className="job-card-all-list-container">
              <div className="small-upper-all-job-card">
                <img
                  className="company-logo-all"
                  alt="company logo"
                  src={each.companyLogoUrl}
                />
                <div className="head-all-job-upper-container">
                  <h1 className="job-title-heading">{each.title}</h1>
                  <div className="rating-card-container">
                    <BsStarFill className="start-logo-icon" />
                    <p className="rating-all-name">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="all-job-upper-container-bottom">
                <div className="location-job-card-container">
                  <div className="small-logo-container-common">
                    <MdLocationOn className="small-common-logo" />
                    <p className="description-name-common">{each.location}</p>
                  </div>
                  <div className="small-logo-container-common">
                    <BsBriefcaseFill className="small-common-logo" />
                    <p className="description-name-common">
                      {each.employmentType}
                    </p>
                  </div>
                </div>
                <p className="description-name-common">
                  {each.packagePerAnnum}
                </p>
              </div>
              <hr className="job-hr-line" />
              <h1 className="description-botton-job-heading">Description</h1>
              <p className="detail-description-name-common">
                {each.jobDescription}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    ) : (
      <div className="no-job-container">
        <img
          className="no-job-logo"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="fail-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  const failureJobView = () => (
    <div className="failure-container">
      <img
        className="fail-logo-job"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="fail-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={jobFuntion} className="job-retry-btn">
        Retry
      </button>
    </div>
  )

  const loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switch (jobApiStatusDetail) {
    case apiJobConstant.failure:
      return failureJobView()
    case apiJobConstant.success:
      return successView()

    case apiJobConstant.inProgress:
      return loaderView()
    default:
      return null
  }
}
export default AllJobCards
