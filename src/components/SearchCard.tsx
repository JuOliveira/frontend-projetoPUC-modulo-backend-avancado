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
    <Card sx={{maxWidth: 600, display: 'flex'}}>
        <CardMedia
          component="img"
          image={props.coverImage}
          alt='anime cover image'
          width={320}
        />
        <CardContent>
          <div>
            <p>{props.title_romaji}</p>
            <p dangerouslySetInnerHTML={{__html: props.description}}/>
            <p>{props.start_date}</p>
            <p>{props.status}</p>
          </div>
        </CardContent>
    </Card>
  )
}

export default SearchCard