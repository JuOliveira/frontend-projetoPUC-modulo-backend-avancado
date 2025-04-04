import { SeasonListResponse } from "../types/api_types"

const apiURL = 'https://graphql.anilist.co'

export async function getSeasonAnime(season: string, seasonYear: number): Promise<SeasonListResponse> {
  const query = `
    query ($season: MediaSeason, $seasonYear: Int) {
      Page {
        media(season: $season, seasonYear: $seasonYear, format: TV) {
          id
          title {
            romaji
            native
            english
          }
          description
          genres
          format
          season
          seasonYear
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
          studios {
            nodes {
              name
              isAnimationStudio
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