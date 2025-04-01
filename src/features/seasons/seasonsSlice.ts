import { createSlice } from "@reduxjs/toolkit";

import { createAppAsyncThunk } from "../../types/withTypes";
import { getSeasonAnime } from "../../services/external_api";
import { RootState } from "../../store";
import { AnimeItem } from "../../types/apiTypes";

type SeasonsList = {
  [key: string]: Array<AnimeItem>,
}

const initialState: SeasonsList = {
  WINTER: [],
  SPRING: [],
  SUMMER: [],
  FALL: [],
}

export const fetchSeasonList = createAppAsyncThunk(
  'seasonList/fetchList',
  async () => {
    const formattedResponse: SeasonsList = {
      WINTER: [],
      SPRING: [],
      SUMMER: [],
      FALL: [],
    }

    const seasonsArray = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
    
    for (const season of seasonsArray) {
      const response = await getSeasonAnime(season, 2025)
  
      for (const item of response.data.Page.media) {
        const formattedItem = {
          id: item.id,
          title_romaji: item.title.romaji,
          title_native: item.title.native,
          title_english: item.title.english,
          genres: item.genres,
          airingSchedule: item.airingSchedule.nodes,
          description: item.description,
          seasonYear: item.seasonYear,
          season: item.season,
          format: item.format,
          coverImage_medium: item.coverImage.medium,
          coverImage_large: item.coverImage.large,
          studios: item.studios.nodes,
        }
  
        formattedResponse[season].push(formattedItem)
      }
    }

    return formattedResponse
  }
)

const seasonSlice = createSlice({
  name: 'seasons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeasonList.fulfilled, (_state, action) => {
        return action.payload
      });
  },
})

export default seasonSlice.reducer

export const allSeasonsLists = (state: RootState) => state.seasonsReducer