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

type GenresArray = {
  id: number,
  name: string,
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

type ResponseAnimeList = {
  data: AnimeListItemType[]
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

type ResponseMsg = {
  message: string,
}

export type RequestResponse = {
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

export async function getAnimeList(): Promise<ResponseAnimeList> {
  const url = 'http://127.0.0.1:5000/anime_list'

  return fetch(url, {
    method: 'get'
  }).then(response => response.json())
    .catch(error => {
      console.log('Error: ', error)
    })
}

export async function addAnime(anime: InputAnimeItem): Promise<ResponseMsg> {
  const url = 'http://127.0.0.1:5000/anime'

  const formData = new FormData();

  formData.append('id', String(anime.id))
  formData.append('title_romaji', anime.title_romaji)
  formData.append('title_native', anime.title_native)
  formData.append('title_english', anime.title_english)
  formData.append('description', anime.description)
  formData.append('season', anime.season)
  formData.append('cover_image_medium', anime.cover_image_medium)
  formData.append('cover_image_large', anime.cover_image_large)
  formData.append('start_date', anime.start_date)
  formData.append('end_date', anime.end_date)
  formData.append('episodes', String(anime.episodes))
  formData.append('status', anime.status)
  formData.append('rating', String(anime.rating))
  formData.append('is_favorite', anime.is_favorite ? '1' : '0')
  formData.append('user_status', anime.user_status)
  
  anime.genres.forEach(genre => {
    formData.append('genres', genre)
  })


  return fetch(url, {
    method: 'post',
    body: formData,
  }).then(response => response.json())
    .catch(error => {
      console.log('Error: ', error)
    })
}

export async function editAnime(anime: InputAnimeItem): Promise<ResponseMsg> {
  const url = 'http://127.0.0.1:5000/anime'

  const formData = new FormData();

  formData.append('id', String(anime.id))
  formData.append('title_romaji', anime.title_romaji)
  formData.append('title_native', anime.title_native)
  formData.append('title_english', anime.title_english)
  formData.append('description', anime.description)
  formData.append('season', anime.season)
  formData.append('cover_image_medium', anime.cover_image_medium)
  formData.append('cover_image_large', anime.cover_image_large)
  formData.append('start_date', anime.start_date)
  formData.append('end_date', anime.end_date)
  formData.append('episodes', String(anime.episodes))
  formData.append('status', anime.status)
  formData.append('rating', String(anime.rating))
  formData.append('is_favorite', anime.is_favorite ? '1' : '0')
  formData.append('user_status', anime.user_status)
  
  anime.genres.forEach(genre => {
    formData.append('genres', genre)
  })

  return fetch(url, {
    method: 'put',
    body: formData,
  }).then(response => response.json())
    .catch(error => {
      console.log("Error: ", error)
    })
}

export async function getAnime(id: number): Promise<AnimeItemType> {
  const url = `http://127.0.0.1:5000/anime?id=${id}`
  return fetch(url, {
    method: 'get',
  }).then(response => response.json())
    .catch(error => {
      console.log('Error: ', error)
    })
}

export async function deleteAnime(id: number): Promise<ResponseMsg> {
  const url = `http://127.0.0.1:5000/anime?id=${id}`
  return fetch(url, {
    method: 'delete',
  }).then(response => response.json())
    .catch(error => {
      console.log('Error: ', error)
    })
}

export async function searchAnime(search: string): Promise<RequestResponse> {
  const apiURL = 'https://graphql.anilist.co'

  const query = `
    query ($search: String, $type: MediaType) {
      Page {
        pageInfo {
          total
          hasNextPage
          currentPage
        }
        media (search: $search, type: $type) {
          id
          title {
            romaji
            native
            english
          }
          description
          coverImage {
            medium
            large
          }
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          status
          season
          seasonYear
          genres
          episodes
        }
      }
    }
  `

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        search: search,
        type: 'ANIME',
      },
    })
  }).then(response => response.json())
}