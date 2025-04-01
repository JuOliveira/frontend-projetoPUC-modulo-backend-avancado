import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { useAppSelector } from "../types/withTypes"
import { allSeasonsLists } from "../features/seasons/seasonsSlice"
import { AnimeItem } from "../types/apiTypes"
import ScheduleCard from "../components/ScheduleCard"

type AnimeScheduleItem = {
  title_romaji: string,
  airingAt: string,
  coverImage: string,
  studio: string,
}

type formattedRows = {
  id: number,
  dayOfWeek: string,
  animes: AnimeScheduleItem[]
}

type currentSchedule = {
  [key: string]: AnimeScheduleItem[]
}

function SeasonSchedule() {
  const seasonsList = useAppSelector(allSeasonsLists)
  const [tableRows, setTableRows] = useState<formattedRows[]>([])
  const columns: GridColDef[] = [
    {
      field: 'dayOfWeek'
    },
    {
      field: 'animes',
      display: 'flex',
      renderCell: (params) => (
        params.value.map((item: AnimeScheduleItem, index: number) => (
          <ScheduleCard
            key={index}
            title_romaji={item.title_romaji}
            coverImage={item.coverImage}
            airingAt={item.airingAt}
            studio={item.studio}
          />
        ))
      )
    }
  ]


  useEffect(() => {
    const formatScheduleData = () => {
      let currentSeasonList: AnimeItem[] = []
      const formattedRows: formattedRows[] = []
      const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
      const currentSchedule: currentSchedule = {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
      }
  
      switch(dayjs().month()) {
        case 0:
        case 1:
        case 2:
          currentSeasonList = seasonsList.WINTER
          break
        case 3:
        case 4:
        case 5:
          currentSeasonList = seasonsList.SPRING
          break
        case 6:
        case 7:
        case 8:
          currentSeasonList = seasonsList.SUMMER
          break
        case 9:
        case 10:
        case 11:
          currentSeasonList = seasonsList.FALL
          break
      }
  
      for (const item of currentSeasonList) {
        const itemWeekDay = dayjs.unix(item.airingSchedule[0].airingAt).day()

        const studiosArray = item.studios.filter (i => i.isAnimationStudio)

        let studio: string

        if (studiosArray.length === 0) {
          studio = item.studios[0].name
        } else {
          let studioNames: string[] = []
          studiosArray.forEach(item => {
            studioNames.push(item.name)
          })

          studioNames = [...new Set(studioNames)]
          studio = studioNames.join(", ")
        }

        currentSchedule[weekDays[itemWeekDay]].push({
          title_romaji: item.title_romaji,
          airingAt: dayjs.unix(item.airingSchedule[0].airingAt).format('HH:mm A'),
          coverImage: item.coverImage_large,
          studio: studio,
        })
  
      }

      Object.entries(currentSchedule).forEach(([key, value], index) => {
        formattedRows.push({
          id: index,
          dayOfWeek: key,
          animes: value
        })
      })
  
      return formattedRows
  
    }

    if (seasonsList) {
      const schedule = formatScheduleData()
      setTableRows(schedule)
    }
  },[seasonsList])

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={tableRows}
        hideFooter
        getRowHeight={() => 'auto'}
        columnHeaderHeight={0}
      />
    </div>
  )
}

export default SeasonSchedule

