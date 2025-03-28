import { useEffect, useState } from "react"
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useAppSelector } from "../types/withTypes"
import { allSeasonsLists } from "../features/seasons/seasonsSlice"
import { AnimeItem, NodeType } from "../types/apiTypes"
import SeasonCard from "../components/SeasonCard"

type SeasonListTabProps = {
  seasonList: Array<AnimeItem>,
  value: number,
  index: number,
}

function SeasonListTab(props: SeasonListTabProps) {
  const { seasonList, value, index } = props

  const getAiringTime = (animeItem: AnimeItem) => {
    let time: NodeType

    if (animeItem.airingSchedule.length !== 0) {
      time = animeItem.airingSchedule.find(schedule => schedule.timeUntilAiring > 0) as NodeType

      if (!time) {
        time = animeItem.airingSchedule.slice(-1)[0]
      }
    } else {
      time = {
        airingAt: `${animeItem.season} ${animeItem.seasonYear}`,
        episode: 0,
        timeUntilAiring: 0,
      }
    }

    return time
  }

  return (
      <Grid container spacing={2}>
      {value === index && seasonList.map((anime) => (
        <Grid size={3} key={anime.id}>
          <SeasonCard
            title_romaji={anime.title_romaji}
            description={anime.description}
            coverImage={anime.coverImage_medium}
            episode={getAiringTime(anime).episode}
            format={anime.format}
            airingAt={getAiringTime(anime).airingAt}
            genres={anime.genres}
          />
        </Grid>
      ))}
    </Grid>
  )
}


function SeasonList() {
  const seasonsList = useAppSelector(allSeasonsLists)
  const [winterSeason, setWinterSeason] = useState<Array<AnimeItem>>([])
  const [springSeason, setSpringSeason] = useState<Array<AnimeItem>>([])
  const [summerSeason, setSummerSeason] = useState<Array<AnimeItem>>([])
  const [fallSeason, setFallSeason] = useState<Array<AnimeItem>>([])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getInitialTab = () => {
    let initialTabValue: number = 0

    switch (dayjs().month()) {
      case 0:
      case 1:
      case 2:
        initialTabValue = 0
        break
      case 3:
      case 4:
      case 5:
        initialTabValue = 1
        break
      case 6:
      case 7:
      case 8:
        initialTabValue = 2
        break
      case 9:
      case 10:
      case 11:
        initialTabValue = 3
        break
    }

    return initialTabValue  
  }

  const [tabValue, setTabValue] = useState<number>(getInitialTab())

  useEffect(() => {

    if (seasonsList && seasonsList.WINTER.length !== 0) {
      setWinterSeason(seasonsList.WINTER)
    }
    if (seasonsList && seasonsList.SPRING.length !== 0) {
      setSpringSeason(seasonsList.SPRING)
    }
    if (seasonsList && seasonsList.SUMMER.length !== 0) {
      setSummerSeason(seasonsList.SUMMER)
    }
    if (seasonsList && seasonsList.FALL.length !== 0) {
      setFallSeason(seasonsList.FALL)
    }
  }, [seasonsList])


  return (
    <div>
      <div>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Winter 2025" value={0}/>
          <Tab label="Spring 2025" value={1}/>
          <Tab label="Summer 2025" value={2}/>
          <Tab label="Fall 2025" value={3}/>
        </Tabs>
      </div>
      <SeasonListTab seasonList={winterSeason} value={tabValue} index={0}/>
      <SeasonListTab seasonList={springSeason} value={tabValue} index={1}/>
      <SeasonListTab seasonList={summerSeason} value={tabValue} index={2}/>
      <SeasonListTab seasonList={fallSeason} value={tabValue} index={3}/>
    </div>
  )
}

export default SeasonList