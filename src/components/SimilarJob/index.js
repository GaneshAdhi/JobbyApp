import './index.css'

import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

const SimilarJobComponent = props => {
  const {specificSimilarJobDetailsList} = props

  return (
    <div>
      <h1 className="similar-job-heading">Similar Jobs</h1>
      <div className="list-similar-job-container">
        {specificSimilarJobDetailsList.map(each => (
          <div className="similar-job-card-container" key={each.id}>
            <div className="similar-job-logo-title-card">
              <img
                className="similar-job-company-logo"
                alt="similar job company logo"
                src={each.companyLogoUrl}
              />
              <div className="similar-title-rating-card">
                <h1 className="heading-similar">{each.title}</h1>
                <div className="similar-icon-card">
                  <BsFillStarFill className="similar-rating-icon" />
                  <p className="similar-raing-name">{each.rating}</p>
                </div>
              </div>
            </div>
            <div className="similar-description-card-container">
              <h1 className="similar-heading-description">Description</h1>
              <p className="similar-description-para">{each.jobDescription}</p>
            </div>
            <div className="similar-location-employment-type-container">
              <div className="similar-icon-name-small-card">
                <FaMapMarkerAlt className="similar-small-icons" />
                <p className="similar-small-name">{each.location}</p>
              </div>
              <div className="similar-icon-name-small-card">
                <BsBriefcaseFill className="similar-small-icons" />
                <p className="similar-small-name">{each.employmentType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimilarJobComponent
