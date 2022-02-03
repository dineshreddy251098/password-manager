import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onShowPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilteredPasswordsList = () => {
    const {searchInput, passwordsList} = this.state

    return passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  renderAddPasswordManager = () => {
    const {website, username, password} = this.state
    return (
      <div className="password-manager-container">
        <img
          className="password-manager-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt="password manager"
        />
        <form
          onSubmit={this.onSubmitPassword}
          className="add-password-container"
        >
          <h1 className="add-password-heading">Add New Password</h1>
          <div className="input-container">
            <img
              className="input-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input
              onChange={this.onChangeWebsite}
              value={website}
              placeholder="Enter Website"
              className="input"
              type="text"
            />
          </div>
          <div className="input-container">
            <img
              className="input-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <input
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Enter username"
              className="input"
              type="text"
            />
          </div>
          <div className="input-container">
            <img
              className="input-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              onChange={this.onChangePassword}
              value={password}
              placeholder="Enter Password"
              className="input"
              type="password"
            />
          </div>
          <div className="btn-container">
            <button className="add-btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    )
  }

  onDeletePasswords = id => {
    const {passwordsList} = this.state
    const newPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordsList: newPasswordList})
  }

  renderYourPasswords = () => {
    const {searchInput, showPassword} = this.state
    const filteredPasswordsList = this.getFilteredPasswordsList()

    return (
      <div className="your-passwords-container">
        <div className="passwords-header-section">
          <h1 className="passwords-count-heading">
            Your Passwords{' '}
            <span className="passwords-count">
              {filteredPasswordsList.length}
            </span>
          </h1>
          <div className="search-container">
            <img
              className="search-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              onChange={this.onChangeSearch}
              value={searchInput}
              className="search-input"
              type="search"
            />
          </div>
        </div>
        <hr />
        <div className="show-password-container">
          <input
            onChange={this.onShowPasswords}
            className="checkbox"
            id="passwords"
            type="checkbox"
          />
          <label className="checkbox-label" htmlFor="passwords">
            Show Passwords
          </label>
        </div>
        {filteredPasswordsList.length === 0 ? (
          <div className="no-passwords-container">
            <img
              className="password-manager-image"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p className="passwords-count-heading no-passwords">No Passwords</p>
          </div>
        ) : (
          <ul className="passwords-list-container">
            {filteredPasswordsList.map(eachPassword => (
              <PasswordItem
                onDeletePasswords={this.onDeletePasswords}
                showPassword={showPassword}
                key={eachPassword.id}
                eachPassword={eachPassword}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt=" app logo"
        />
        {this.renderAddPasswordManager()}
        {this.renderYourPasswords()}
      </div>
    )
  }
}
export default PasswordManager
