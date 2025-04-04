type ScheduleCardProps = {
  title_romaji: string,
  coverImage: string,
  airingAt: string,
  studio: string
}

function ScheduleCard(props: ScheduleCardProps) {
 return (
  <div>
    <img src={props.coverImage}></img>
    <div>
      <p>{props.title_romaji}</p>
      <p>{props.airingAt}</p>
      <p>{props.studio}</p>
    </div>
  </div>
 )
}

export default ScheduleCard