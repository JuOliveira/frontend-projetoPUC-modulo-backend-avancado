export type ResponseItem = {
  id: number,
  genres: string[],
  title: {
    romaji: string,
    native: string,
    english: string,
  },
  airingSchedule: {
    nodes: ScheduleNodeType[]
  },
  description: string,
  seasonYear: number,
  season: string,
  format: string,
  coverImage: {
    medium: string,
    large: string,
  }
  studios: {
    nodes: StudiosNodeType[]
  }
}

export type RequestResponse = {
  data: {
    Page: {
      media: ResponseItem[]
    }
  }
}

export type ScheduleNodeType = {
  episode: number,
  airingAt: number,
  timeUntilAiring: number,
}

export type SeasonNodeType = {
  episode: number,
  airingAt: number | string,
  timeUntilAiring: number,
}

export type StudiosNodeType = {
  name: string,
  isAnimationStudio: boolean,
}

export type AnimeItem = {
  id: number,
  genres: Array<string>,
  title_romaji: string,
  title_native: string,
  title_english: string,
  airingSchedule: ScheduleNodeType[],
  description: string,
  seasonYear: number,
  season: string,
  format: string,
  coverImage_medium: string,
  coverImage_large: string,
  studios: StudiosNodeType[],
}