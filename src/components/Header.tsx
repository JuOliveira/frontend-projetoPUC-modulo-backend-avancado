import { useNavigate } from "react-router"

import CustomButton from "./CustomButton"

function Header() {
  const navigate = useNavigate()

  return (
    <div className="c-header">
      <CustomButton
        onClickFunction={() => navigate('/')}
        type="button"
        btnClassname="header-logo-btn"
        svg="AppLogo"
        svgClassname="logo-icon"
      />
      <div className="header-navigation">
        <CustomButton
          text="Home"
          onClickFunction={() => navigate('/')}
          type="button"
          btnClassname="header-btn"
          textClassname="header-btn-text"
          svg="Home"
          svgClassname="header-btn-icon"
        />
        <CustomButton
          text="Season Schedule"
          onClickFunction={() => navigate('/season-schedule')}
          type="button"
          btnClassname="header-btn"
          textClassname="header-btn-text"
          svg="CalendarMonth"
          svgClassname="header-btn-icon"
        />
        <CustomButton
          text="My Lists"
          onClickFunction={() => navigate('/my-lists')}
          type="button"
          btnClassname="header-btn"
          textClassname="header-btn-text"
          svg="List"
          svgClassname="header-btn-icon"
        />
      </div>
    </div>
  ) 
}

export default Header