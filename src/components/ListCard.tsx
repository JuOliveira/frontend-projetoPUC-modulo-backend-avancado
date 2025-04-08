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
    <Card 
      className='c-list-card'
    >
      <CardActionArea
        onClick={() => handleCardClick(props.id)}
      >
        <CardMedia
          component="img"
          image={props.coverImage}
          className='list-card-image'
          alt='anime cover art'
        />
        <CardContent>
          <div>
            <p className='list-card-title'>{props.title_romaji}</p>
            <Rating value={props.rating} readOnly/>
            <p className='list-card-item'>{props.user_status}</p>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions
        className='c-list-card-actions'
      >
        <IconSelector svg={favoriteIconStatus(props.is_favorite)} classname="favorite-icon"/>
        <CustomButton
          type='button'
          svg='Delete'
          svgClassname='list-card-icon'
          btnClassname='list-card-btn'
          onClickFunction={() => props.onClickFunction(props.id)}
        />
      </CardActions>
    </Card>
  )
}

export default ListCard