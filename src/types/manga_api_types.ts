import { GenresArray } from "./apiTypes"

export type MangaListItemType = {
  id: number,
  title_romaji: string,
  title_native: string,
  title_english: string,
  description: string,
  cover_image_medium: string,
  cover_image_large: string,
  start_date: string,
  end_date: string,
  status: string,
  volumes: number,
  chapters: number,
  story: string,
  art: string,
  rating: number,
  user_status: number,
  is_favorite: boolean
  genres: GenresArray[]
}

export type ResponseMangaList = {
  data: MangaListItemType[]
}

export type InputMangaItem = {
  id: number,
  title_romaji: string,
  title_native: string,
  title_english: string,
  description: string,
  cover_image_medium: string,
  cover_image_large: string,
  start_date: string,
  end_date: string,
  status: string,
  volumes: number,
  chapters: number,
  story: string,
  art: string,
  rating: number,
  user_status: number,
  is_favorite: boolean
  genres: string[]
}

export type MangaItemType = {
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
    status: string,
    volumes: number,
    chapters: number,
    story: string,
    art: string,
    rating: number,
    user_status: number,
    is_favorite: boolean
    genres: GenresArray[]
  }
}

export type MangaSearchItem = {
  id: number,
  genres: string[],
  title: {
    romaji: string,
    native: string,
    english: string,
  },
  description: string,
  volumes: number,
  chapters: number,
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
  staff: {
    edges: {
      role: string,
      id: number,
      node: {
        name: {
          full: string,
        }
      }
    }
  }
}

export type MangaSearchResponse = {
  data: {
    Page: {
      pageInfo: {
        total: number,
        hasNextPage: boolean,
        currentPage: number,
      },
      media: MangaSearchItem[]
    }
  }
}

