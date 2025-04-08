import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

type ScheduleCardProps = {
  title_romaji: string,
  coverImage: string,
  airingAt: string,
  studio: string
}

function ScheduleCard(props: ScheduleCardProps) {
 return (
  <Card 
    className='c-schedule-card'
  >
    <CardMedia
      component="img"
      image={props.coverImage}
      alt='anime cover image'
      className='season-card-image'
    />
    <CardContent
      className='schedule-card-content'
    >
      <div className='c-schedule-card-content'>
        <p className='schedule-card-title'>{props.title_romaji}</p>
        <p className='schedule-card-item'>{props.airingAt}</p>
        <p className='schedule-card-item'>{props.studio}</p>
      </div>
    </CardContent>
  </Card>
 )
}

export default ScheduleCard