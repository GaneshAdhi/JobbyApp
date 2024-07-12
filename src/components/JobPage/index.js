import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../HeaderPage'

import Profile from '../ProfileCard'

import CheckBoxButton from '../CheckBoxButtons'

import RadioButton from '../RadioButtons'

import AllJobCards from '../AllJobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiJobConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Job extends Component {
  state = {
    employmentTypesListValue: [],
    radioButtonUpdate: '',
    searchValue: '',
    allJobDatas: [],
    jobApiStatus: apiJobConstant.initial,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({jobApiStatus: apiJobConstant.inProgress})
    const {
      employmentTypesListValue,
      radioButtonUpdate,
      searchValue,
    } = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesListValue.join()}&minimum_package=${radioButtonUpdate}&search=${searchValue}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const upadateJobSnakeToCamel = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        allJobDatas: upadateJobSnakeToCamel,
        jobApiStatus: apiJobConstant.success,
        searchValue: '',
      })
    } else {
      this.setState({jobApiStatus: apiJobConstant.failure})
    }
  }

  searchInputVal = event => {
    this.setState({searchValue: event.target.value})
  }

  searchIconClick = () => {
    this.getAllJobs()
  }

  enterKeyPress = event => {
    if (event.key === 'Enter') {
      this.getAllJobs()
    }
  }

  checkOptionUpdate = valueCheckBox => {
    const {employmentTypesListValue} = this.state
    if (employmentTypesListValue.includes(valueCheckBox)) {
      const newCheckBoxValue = employmentTypesListValue.filter(
        each => each !== valueCheckBox,
      )
      this.setState(
        {employmentTypesListValue: newCheckBoxValue},
        this.getAllJobs,
      )
    } else {
      this.setState(
        pre => ({
          employmentTypesListValue: [
            ...pre.employmentTypesListValue,
            valueCheckBox,
          ],
        }),
        this.getAllJobs,
      )
    }
  }

  radioValueUpdate = valueRadio => {
    this.setState({radioButtonUpdate: valueRadio}, this.getAllJobs)
  }

  render() {
    const {allJobDatas, jobApiStatus, searchValue} = this.state

    return (
      <div className="job-main-container">
        <Header />
        <div className="second-job-container">
          <div className="input-container">
            <input
              onChange={this.searchInputVal}
              onKeyDown={this.enterKeyPress}
              value={searchValue}
              placeholder="Search"
              type="search"
              className="input-small-size"
            />
            <button
              onClick={this.searchIconClick}
              className="search-btn-constainer"
              type="button"
              data-testid="searchButton"
            >
              <BsSearch aria-label="searchBtn" className="search-icon" />
            </button>
          </div>
          <div>
            <Profile />
            <hr className="seperater-line" />
            <ul>
              <h1 className="employment-heading">Type of Employnent</h1>
              {employmentTypesList.map(each => (
                <CheckBoxButton
                  updateCheckBox={this.checkOptionUpdate}
                  key={each.employmentTypeId}
                  checkButtonDetail={each}
                  id={each.employmentTypeId}
                />
              ))}
            </ul>
            <hr className="seperater-line" />
            <ul>
              <h1 className="employment-heading">Salary Range</h1>
              {salaryRangesList.map(each => (
                <RadioButton
                  radioValueUpdates={this.radioValueUpdate}
                  key={each.salaryRangeId}
                  radioButtonDetail={each}
                />
              ))}
            </ul>
          </div>
          <div className="large-container">
            <div className="input-container-large">
              <input
                onChange={this.searchInputVal}
                onKeyDown={this.enterKeyPress}
                value={searchValue}
                placeholder="Search"
                type="text"
                className="input-small-size"
              />
              <button
                onClick={this.searchIconClick}
                className="search-btn-constainer"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch aria-label="searchIcon2" className="search-icon" />
              </button>
            </div>
            <AllJobCards
              allJobsDatas={allJobDatas}
              jobApiStatusDetail={jobApiStatus}
              getAllJobsFunction={this.getAllJobs}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Job
