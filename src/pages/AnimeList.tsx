import { useNavigate } from "react-router"

import CustomButton from "../components/CustomButton"

function AnimeList() {
  const navigate = useNavigate()
  return (
    <div>
      AnimeList
      <CustomButton
        text="Add"
        onClickFunction={() => navigate('/add-anime')}
        type="button"
        btnClassname="primary-btn"
        svg="AddCircle"
        svgClassname="btn-icon"
      />
    </div>
  )
}

export default AnimeList