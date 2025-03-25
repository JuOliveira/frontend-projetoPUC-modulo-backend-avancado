import { useNavigate } from "react-router"
import { Button } from "@mui/material"

function MyLists() {
  const navigate = useNavigate()
  return (
    <div>
      My Lists
      <Button
        onClick={() => navigate('/anime-list')}
      >
        Anime List
      </Button>
      <Button
        onClick={() => navigate('/manga-list')}
      >
        Manga List
      </Button>
    </div>
  )
}

export default MyLists