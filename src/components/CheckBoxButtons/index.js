import './index.css'

const CheckBoxButton = props => {
  const {checkButtonDetail, updateCheckBox} = props
  const {employmentTypeId, label} = checkButtonDetail

  const updateAnswer = event => {
    updateCheckBox(event.target.id)
  }
  return (
    <li className="list-type-container">
      <input
        onChange={updateAnswer}
        value={employmentTypeId}
        className="checkbox-box-style"
        id={employmentTypeId}
        type="checkbox"
      />
      <label className="label-style" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default CheckBoxButton
