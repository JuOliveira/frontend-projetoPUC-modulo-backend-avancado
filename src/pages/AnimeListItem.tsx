import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { Checkbox, Rating }from "@mui/material"
import { Formik } from "formik"

import { getAnime, editAnime } from "../services/anime_api"
import { InputAnimeItem } from "../types/anime_api_types"
import IconSelector from "../components/IconSelector"
import { anime_user_status } from "../utils/constants"
import CustomButton from "../components/CustomButton"

function AnimeListItem() {
  const { animeId } = useParams()
  const navigate = useNavigate()
  const [animeItem, setAnimeItem] = useState<InputAnimeItem>()

  const onFormSubmit = async (values: InputAnimeItem) => {
    console.log('values', values)
    const response = await editAnime(values)
    
    if (response) {
      navigate('/anime-list')
    }
  }

  useEffect(() => {
    async function fetchAnimeData() {
      const response = await getAnime(Number(animeId))

      console.log('response', response)
      const formattedGenres: string[] = []
      response.data.genres.forEach(genre => {
        formattedGenres.push(genre.name)
      })

      const formattedResponse: InputAnimeItem = {
        id: response.data.id,
        title_romaji: response.data.title_romaji,
        title_native: response.data.title_native,
        title_english: response.data.title_english,
        description: response.data.description,
        cover_image_medium: response.data.cover_image_medium,
        cover_image_large: response.data.cover_image_large,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
        season: response.data.season,
        status: response.data.status,
        episodes: response.data.episodes,
        rating: response.data.rating,
        user_status: response.data.user_status,
        is_favorite: response.data.is_favorite,
        genres: formattedGenres,
      }

      setAnimeItem(formattedResponse)
    }

    fetchAnimeData()
  },[animeId])

  return (
    <div>
      {animeItem && (
        <Formik
          initialValues={{
            ...animeItem,
          }}
          onSubmit={(values) => onFormSubmit(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <img
                  src={animeItem.cover_image_large}
                />
                <div>
                  <div>
                    <p>{animeItem.title_romaji}</p>
                    <Checkbox
                      name="is_favorite"
                      icon={<IconSelector svg="Favorite" classname="favorite-input"/>}
                      checkedIcon={<IconSelector svg="FavoriteFilled" classname="favorite-input"/>}
                      checked={values.is_favorite}
                      onChange={handleChange}
                    />
                  </div>
                  <p>English title: {animeItem.title_english}</p>
                  <p>Japanese title: {animeItem.title_native}</p>
                  <p>{animeItem.description}</p>
                  <p>Season: {animeItem.season}</p>
                  {animeItem.episodes && <p>Episodes: {animeItem.episodes}</p>}
                  <p>Start Date: {animeItem.start_date}</p>
                  {animeItem.end_date && <p>End Date: {animeItem.end_date}</p>}
                  <p>Status: {animeItem.status}</p>
                  <Rating
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                  />
                  <select
                    name="user_status"
                    value={values.user_status}
                    onChange={handleChange}
                  >
                      <option value='none'>
                        Choose a status
                      </option>
                    {Object.keys(anime_user_status).map((item) => (
                      <option key={item} value={item}>
                        {anime_user_status[item]}
                      </option>
                    ))}
                  </select>
                </div>
                <CustomButton
                  text="Back"
                  type="button"
                  svg="ArrowCircleLeft"
                  svgClassname="form-btn-icon"
                  btnClassname="form-btn"
                  onClickFunction={() => navigate(-1)}
                />
                <CustomButton
                  text="Save"
                  type="submit"
                  svg="CheckCircle"
                  svgClassname="form-btn-icon"
                  btnClassname="form-btn"
                />
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default AnimeListItem