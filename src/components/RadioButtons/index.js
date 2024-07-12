import './index.css'

const RadioButton = props => {
  const {radioButtonDetail, radioValueUpdates} = props
  const {salaryRangeId, label} = radioButtonDetail
  const radioValueClick = event => {
    radioValueUpdates(event.target.value)
  }
  return (
    <li className="radio-type-container">
      <input
        onChange={radioValueClick}
        className="radio-btn"
        value={salaryRangeId}
        name="salary"
        type="radio"
        id={salaryRangeId}
      />
      <label className="radio-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default RadioButton
