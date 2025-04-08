import dayjs from "dayjs"
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

type SeasonCardProps = {
  coverImage: string,
  title_romaji: string,
  description: string,
  episode: number,
  airingAt: string | number,
  format: string,
  genres: Array<string>,
}

function SeasonCard(props: SeasonCardProps) {
  
  return (
    <Card sx={{maxWidth: 600, height: 320, display: 'flex'}}>
      <CardMedia
        component="img"
        image={props.coverImage}
        alt='anime cover image'
        className="season-card-image"
        />
        <CardContent>
          <div className="c-season-card-content">
            <p className="season-card-title">{props.title_romaji}</p>
            {props.episode !==0 && <p className="season-card-item"><b>Episode {props.episode}</b></p>}
            <p className="season-card-description" dangerouslySetInnerHTML={{__html: props.description}}/>
            <div className="c-season-card-footer">
              <p className="season-card-item"><b>Format:</b>{props.format}</p>
              <p className="season-card-item"><b>Airing:</b>{typeof props.airingAt === 'string' ? props.airingAt : dayjs.unix(props.airingAt).format('DD-MM-YYYY')}</p>
              {props.genres.map((genre, index) => (
                <Chip 
                  key={index} 
                  label={genre}
                  sx={{
                    color: '#FFFFFF',
                    backgroundColor: '#7873ba',
                    margin: '2px',
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
    </Card>
  )
} 

export default SeasonCard