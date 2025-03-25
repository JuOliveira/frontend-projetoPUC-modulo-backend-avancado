import { useNavigate } from "react-router"

import CustomButton from "./CustomButton"

function Header() {
  const navigate = useNavigate()

  return (
    <div>
      Logo
      <CustomButton
        text="Home"
        onClickFunction={() => navigate('/')}
        type="button"
        btnClassname="header-btn"
        svg="Home"
        svgClassname="header-btn-icon"
      />
      <CustomButton
        text="Season Schedule"
        onClickFunction={() => navigate('/season-schedule')}
        type="button"
        btnClassname="header-btn"
        svg="CalendarMonth"
        svgClassname="header-btn-icon"
      />
      <CustomButton
        text="My Lists"
        onClickFunction={() => navigate('/my-lists')}
        type="button"
        btnClassname="header-btn"
        svg="List"
        svgClassname="header-btn-icon"
      />
    </div>
  ) 
}

export default Header