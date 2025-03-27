import { useEffect, useState } from "react"
import Grid from "@mui/material/Grid2"

import { useAppSelector } from "../types/withTypes"
import { allSeasonsLists } from "../features/seasons/seasonsSlice"
import SeasonCard from "../components/SeasonCard"

type AnimeItem = {
  genres: Array<string>,
  title_romaji: string,
  title_native: string,
  title_english: string,
  airingSchedule: Array<NodeType>,
  description: string,
  seasonYear: number,
  season: string,
  format: string,
  coverImage_medium: string,
  coverImage_large: string,
}

type NodeType = {
  episode: number,
  airingAt: number,
  timeUntilAiring: number,
}

function SeasonList() {
  const seasonsList = useAppSelector(allSeasonsLists)
  const [winterSeason, setWinterSeason] = useState<Array<AnimeItem>>([])

  useEffect(() => {
    if (seasonsList && seasonsList.WINTER.length !== 0) {
      setWinterSeason(seasonsList.WINTER)
    }
  }, [seasonsList])


  return (
    <div>
      <Grid container spacing={2}>
        {winterSeason.map((anime) => (
          <Grid size={3} key={anime.title_romaji}>
            <SeasonCard
              title_romaji={anime.title_romaji}
              description={anime.description}
              coverImage={anime.coverImage_medium}
              episode={anime.airingSchedule.length !== 0 ? anime.airingSchedule.slice(-1)[0].episode : 0}
              format={anime.format}
              airingAt={anime.airingSchedule.slice(-1)[0].airingAt}
            />
          </Grid>
        ))}
      </Grid>
      SeasonList
    </div>
  )
}

export default SeasonList