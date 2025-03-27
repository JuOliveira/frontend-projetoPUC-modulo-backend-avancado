type SeasonCardProps = {
  coverImage: string,
  title_romaji: string,
  description: string,
  episode: number,
  airingAt: number,
  format: string,
}

function SeasonCard(props: SeasonCardProps) {
  return (
    <div>
      <img src={props.coverImage}/>
      <div>
        <p>{props.title_romaji}</p>
        <p>{props.description}</p>
        <p>Episode {props.episode}</p>
        <p>Formato: {props.format}</p>
        <p>Airing: {props.airingAt}</p>
      </div>
    </div>
  )
} 

export default SeasonCard