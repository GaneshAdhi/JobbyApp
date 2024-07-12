import './index.css'

import Header from '../HeaderPage'

const NotFoundRoute = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        className="not-found-logo"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1 className="main-not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFoundRoute
