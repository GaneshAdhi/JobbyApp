import './index.css'

import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import {MdLocationOn} from 'react-icons/md'

const SpecificJobDetailComponent = props => {
  const {specificJobDatas} = props

  if (specificJobDatas.length >= 1) {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = specificJobDatas[0]

    return (
      <div key={id} className="specific-job-card-container">
        <div className="upper-logo-card-container">
          <img
            className="company-logo-specific"
            alt="job details company logo"
            src={companyLogoUrl}
          />
          <div className="title-rating-card-container">
            <h1 className="specific-job-title">{title}</h1>
            <div className="rating-card-container">
              <BsStarFill className="specific-rating-star" />
              <p className="specific-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="specific-location-salary-card-container">
          <div className="icon-location-employe-small-card-container">
            <div className="icon-small-card-container">
              <MdLocationOn className="icon-specific" />
              <p className="specific-name-location">{location}</p>
            </div>
            <div className="icon-small-card-container">
              <BsBriefcaseFill className="icon-specific" />
              <p className="specific-name-location">{employmentType}</p>
            </div>
          </div>
          <p className="specific-name-location">{packagePerAnnum}</p>
        </div>
        <hr className="specific-sperater" />
        <div className="description-specific-container-main">
          <div className="description-small-card">
            <h1 className="specific-description-heading">Description</h1>
            <a
              className="link-container"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit
              <span>
                <FiExternalLink />
              </span>
            </a>
          </div>
          <p className="specific-job-description">{jobDescription}</p>
        </div>
        <div className="description-specific-skill-container">
          <h1 className="skill-specific-heading">Skills</h1>
          <ul className="list-skill-container">
            {skills.map(each => (
              <li key={each.name} className="list-skill-small-card">
                <img
                  className="skill-img"
                  alt={each.name}
                  src={each.imageUrl}
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lifeatcompany-main-container">
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-card">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              alt="lifeAtCompany"
              className="life-at-company-logo"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>
      </div>
    )
  }
  return null
}
export default SpecificJobDetailComponent
