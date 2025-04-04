import { GenresArray } from "./api_types"

export type AnimeListItemType = {
  id: number,
  title_romaji: string,
  title_native: string,
  title_english: string,
  description: string,
  cover_image_medium: string,
  cover_image_large: string,
  start_date: string,
  end_date: string,
  season: string,
  status: string,
  episodes: number,
  rating: number,
  user_status: string,
  is_favorite: boolean,
  genres: GenresArray[],
}

export type InputAnimeItem = {
  id: number,
  title_romaji: string,
  title_native: string,
  title_english: string,
  description: string,
  cover_image_medium: string,
  cover_image_large: string,
  start_date: string,
  end_date: string,
  season: string,
  status: string,
  episodes: number,
  rating: number,
  user_status: string,
  is_favorite: boolean,
  genres: string[],
}

export type AnimeItemType = {
  data: {
    id: number,
    title_romaji: string,
    title_native: string,
    title_english: string,
    description: string,
    cover_image_medium: string,
    cover_image_large: string,
    start_date: string,
    end_date: string,
    season: string,
    status: string,
    episodes: number,
    rating: number,
    user_status: string,
    is_favorite: boolean,
    genres: GenresArray[],
  }
}

export type ResponseAnimeItem = {
  id: number,
  genres: string[],
  title: {
    romaji: string,
    native: string,
    english: string,
  },
  description: string,
  seasonYear: number,
  season: string,
  format: string,
  startDate: {
    day: number,
    month: number,
    year: number,
  },
  endDate: {
    day: number,
    month: number,
    year: number,
  }
  coverImage: {
    medium: string,
    large: string,
  }
  status: string,
  episodes: number,
}

export type ResponseAnimeList = {
  data: AnimeListItemType[]
}

export type AnimeSearchResponse = {
  data: {
    Page: {
      pageInfo: {
        total: number,
        hasNextPage: boolean,
        currentPage: number,
      },
      media: ResponseAnimeItem[]
    }
  }
}