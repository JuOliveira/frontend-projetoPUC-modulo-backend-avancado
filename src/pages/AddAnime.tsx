import { useNavigate } from "react-router"

import CustomButton from "../components/CustomButton"

function AddAnime() {
  const navigate = useNavigate()

  return (
    <div>
      AddAnime
      <CustomButton
        text="Back"
        onClickFunction={() => navigate(-1)}
        type="button"
        btnClassname="primary-btn"
        svg="ArrowCircleLeft"
        svgClassname="btn-icon"
      />
    </div>
  )
}

export default AddAnime