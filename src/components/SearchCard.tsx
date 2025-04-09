import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

type SearchCardProps = {
  coverImage: string,
  title_romaji: string,
  description: string,
  start_date: string,
  status: string,
}

function SearchCard(props: SearchCardProps) {
  return (
    <Card sx={{width: '100%', display: 'flex'}}>
      <CardMedia
        component="img"
        image={props.coverImage}
        alt='anime cover image'
        className='list-item-image'
      />
      <CardContent>
        <div>
          <p className="season-card-title">{props.title_romaji}</p>
          <p className="season-card-description" dangerouslySetInnerHTML={{__html: props.description}}/>
          <p className="list-item-text"><b>Start Date: </b>{props.start_date}</p>
          <p className='list-item-text'><b>Status: </b>{props.status}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchCard