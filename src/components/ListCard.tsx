import { useNavigate } from 'react-router'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import Rating from '@mui/material/Rating'

import CustomButton from './CustomButton'
import IconSelector from './IconSelector'

type ListCardProps = {
  coverImage: string,
  title_romaji: string,
  rating: number,
  user_status: string,
  id: number,
  is_favorite: boolean,
  onClickFunction: (id: number) => void,
  url: string,
}

function ListCard(props: ListCardProps) {
  const navigate = useNavigate()

  const handleCardClick = (id: number) => {
    navigate(`${props.url}${id}`)
  }

  const favoriteIconStatus = (status: boolean) => {
    if (status) return 'FavoriteFilled'

    return 'Favorite'
  }

  return (
    <Card sx={{maxWidth: 230}}>
      <CardActionArea
        onClick={() => handleCardClick(props.id)}
      >
        <CardMedia
          component="img"
          image={props.coverImage}
          height={320}
          alt='anime cover art'
        />
        <CardContent>
          <div>
            <p>{props.title_romaji}</p>
            <Rating value={props.rating} readOnly/>
            <p>{props.user_status}</p>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CustomButton
          type='button'
          svg='Delete'
          svgClassname='card-icon'
          btnClassname='card-btn'
          onClickFunction={() => props.onClickFunction(props.id)}
        />
        <IconSelector svg={favoriteIconStatus(props.is_favorite)} classname='favorite-icon'/>
      </CardActions>
    </Card>
  )
}

export default ListCard