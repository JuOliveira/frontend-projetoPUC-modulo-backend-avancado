const apiURL = 'https://graphql.anilist.co'

type ResponseItem = {
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

type RequestResponse = {
  data: {
    Page: {
      media: Array<ResponseItem>
    }
  }
}

type NodeType = {
  episode: number,
  airingAt: number,
  timeUntilAiring: number,
}

export function getSeasonAnime(season: string, seasonYear: number): Promise<RequestResponse> {
  const query = `
    query ($season: MediaSeason, $seasonYear: Int) {
      Page {
        media(season: $season, seasonYear: $seasonYear, format: TV) {
          title {
            romaji
            native
            english
          }
          description
          genres
          format
          coverImage {
            medium
            large
          }
          airingSchedule {
            nodes {
              episode
              airingAt
              timeUntilAiring
            }
          }
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
        season,
        seasonYear,
      },
    })
  }).then(data => data.json())
    .catch(error => {
      console.log("Erro: ", error)
    });
}