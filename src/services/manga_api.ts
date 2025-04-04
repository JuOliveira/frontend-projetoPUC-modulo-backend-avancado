import { 
  ResponseMangaList, 
  InputMangaItem, 
  MangaItemType,
  MangaSearchResponse,
} from "../types/manga_api_types"
import { ResponseMsg } from "../types/api_types"

export async function getMangaList(): Promise<ResponseMangaList> {
  const url = 'http://127.0.0.1:5000/manga_list'

  return fetch(url, {
    method: 'get'
  }).then(response => response.json())
    .catch(error => {
      console.log('Error: ', error)
    })
}

export async function addManga(manga: InputMangaItem): Promise<ResponseMsg> {
  const url = 'http://127.0.0.1:5000/manga'

  const formData = new FormData()

  formData.append('id', String(manga.id))
  formData.append('title_romaji', manga.title_romaji)
  formData.append('title_native', manga.title_native)
  formData.append('title_english', manga.title_english)
  formData.append('description', manga.description)
  formData.append('cover_image_medium', manga.cover_image_medium)
  formData.append('cover_image_large', manga.cover_image_large)
  formData.append('start_date', manga.start_date)
  formData.append('end_date', manga.end_date)
  formData.append('volumes', manga.volumes !== null ? String(manga.volumes) :'0')
  formData.append('chapters', manga.chapters !== null ? String(manga.chapters) : '0')
  formData.append('story', manga.story)
  formData.append('art', manga.art)
  formData.append('status', manga.status)
  formData.append('rating', String(manga.rating))
  formData.append('is_favorite', manga.is_favorite ? '1' : '0')
  formData.append('user_status', String(manga.user_status))

  manga.genres.forEach(genre => {
    formData.append('genres', genre)
  })

  return fetch(url, {
    method: 'post',
    body: formData
  }).then( response => response.json())
    .catch(error => {
      console.log("Error: ", error)
    })

}

export async function editManga(manga: InputMangaItem): Promise<ResponseMsg> {
  const url = 'http://127.0.0.1:5000/manga'

  const formData = new FormData()

  formData.append('id', String(manga.id))
  formData.append('title_romaji', manga.title_romaji)
  formData.append('title_native', manga.title_native)
  formData.append('title_english', manga.title_english)
  formData.append('description', manga.description)
  formData.append('cover_image_medium', manga.cover_image_medium)
  formData.append('cover_image_large', manga.cover_image_large)
  formData.append('start_date', manga.start_date)
  formData.append('end_date', manga.end_date)
  formData.append('volumes', manga.volumes !== null ? String(manga.volumes) :'0')
  formData.append('chapters', manga.chapters !== null ? String(manga.chapters) : '0')
  formData.append('story', manga.story)
  formData.append('art', manga.art)
  formData.append('status', manga.status)
  formData.append('rating', String(manga.rating))
  formData.append('is_favorite', manga.is_favorite ? '1' : '0')
  formData.append('user_status', String(manga.user_status))

  manga.genres.forEach(genre => {
    formData.append('genres', genre)
  })

  return fetch(url, {
    method: 'put',
    body: formData
  }).then( response => response.json())
    .catch(error => {
      console.log("Error: ", error)
    })
}

export async function getManga(id: number): Promise<MangaItemType> {
  const url = `http://127.0.0.1:5000/manga?id=${id}`

  return fetch(url, {
    method: 'get'
  }).then(response => response.json())
    .catch(error => {
      console.log("Error: ", error)
    })
}

export async function deleteManga(id: number): Promise<ResponseMsg> {
  const url = `http://127.0.0.1:5000/manga?id=${id}`

  return fetch(url, {
    method: 'delete'
  }).then(response => response.json())
}

export async function searchManga(search: string): Promise<MangaSearchResponse> {
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
            extraLarge
          }
          volumes
          startDate {
            day
            month
            year
          }
          endDate {
            day
            month
            year
          }
          status
          genres
          chapters
          staff {
            edges {
              role
              id
              node {
                name {
                  full
                }
              }
            }
          }
        }
      }
    }
  `

  return fetch(apiURL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        search: search,
        type: 'MANGA',
      },
    })
  }).then(response => response.json())

}