import './index.css'

const PasswordItem = props => {
  const {eachPassword, showPassword, onDeletePasswords} = props
  const {id, website, username, password} = eachPassword
  const icon = website.slice(0, 1).toUpperCase()

  const onClickedDelete = () => {
    onDeletePasswords(id)
  }

  return (
    <li className="password-container">
      <p className="website-icon">{icon}</p>
      <div>
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {showPassword ? (
          <p className="password">{password}</p>
        ) : (
          <img
            className="password-star"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        onClick={onClickedDelete}
        testid="delete"
        className="delete-btn"
        type="button"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
