import { useNavigate } from "react-router"

import CustomButton from "../components/CustomButton"

function MangaList() {
  const navigate = useNavigate()

  return (
    <div>
      MangaList
      <CustomButton
        text="Add"
        onClickFunction={() => navigate('/add-manga')}
        type="button"
        btnClassname="primary-btn"
        svg="AddCircle"
        svgClassname="btn-icon"
      />
    </div>
  )
}

export default MangaList