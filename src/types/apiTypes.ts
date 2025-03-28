export type ResponseItem = {
  id: number,
  genres: Array<string>,
  title: {
    romaji: string,
    native: string,
    english: string,
  },
  airingSchedule: {
    nodes: Array<NodeType>
  },
  description: string,
  seasonYear: number,
  season: string,
  format: string,
  coverImage: {
    medium: string,
    large: string,
  }
}

export type RequestResponse = {
  data: {
    Page: {
      media: Array<ResponseItem>
    }
  }
}

export type NodeType = {
  episode: number,
  airingAt: number | string,
  timeUntilAiring: number,
}

export type AnimeItem = {
  id: number,
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