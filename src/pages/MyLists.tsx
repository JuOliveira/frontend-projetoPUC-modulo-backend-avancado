import { useNavigate } from "react-router"
import { Button } from "@mui/material"

import IconSelector from "../components/IconSelector"

function MyLists() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="c-schedule-title">
        <IconSelector
          svg="List"
          classname="schedule-title-icon"
        />
        <h1 className="season-schedule-title">My Lists</h1>
      </div>
      <div className="c-list-btn">
        <Button
          onClick={() => navigate('/anime-list')}
          className="list-btn"
        >
          <IconSelector
            svg="LiveTV"
            classname="schedule-btn-icon"
          />
          <p className="list-btn-text">Anime List</p>
        </Button>
        <Button
          onClick={() => navigate('/manga-list')}
          className="list-btn"
        >
          <IconSelector
            svg="MenuBook"
            classname="schedule-btn-icon"
          />
          <p className="list-btn-text">Manga List</p>
        </Button>
      </div>
    </div>
  )
}

export default MyLists