import dayjs from "dayjs"
import Chip from '@mui/material/Chip';

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
    <div>
      <img src={props.coverImage}/>
      <div>
        <p>{props.title_romaji}</p>
        {props.episode !==0 && <p>Episode {props.episode}</p>}
        <p dangerouslySetInnerHTML={{__html: props.description}}/>
        <p>Format: {props.format}</p>
        <p>Airing: {typeof props.airingAt === 'string' ? props.airingAt : dayjs.unix(props.airingAt).format('DD-MM-YYYY')}</p>
        <div>
          {props.genres.map((genre, index) => (
            <Chip key={index} label={genre}/>
          ))}
        </div>
      </div>
    </div>
  )
} 

export default SeasonCard