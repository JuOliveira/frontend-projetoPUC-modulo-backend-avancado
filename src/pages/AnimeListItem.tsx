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
    const response = await editAnime(values)
    
    if (response) {
      navigate('/anime-list')
    }
  }

  useEffect(() => {
    async function fetchAnimeData() {
      const response = await getAnime(Number(animeId))

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
              <div className="c-list-item">
                <img src={animeItem.cover_image_large} className="list-item-image"/>
                <div className="c-list-item-content">
                  <div className="c-list-item-title">
                    <p className="list-item-title">{animeItem.title_romaji}</p>
                    <Checkbox
                      name="is_favorite"
                      icon={<IconSelector svg="Favorite" classname="favorite-icon"/>}
                      checkedIcon={<IconSelector svg="FavoriteFilled" classname="favorite-icon"/>}
                      checked={values.is_favorite}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="list-item-text list-item-margin"><b>English title: </b>{animeItem.title_english}</p>
                    <p className="list-item-text list-item-margin"><b>Japanese title: </b>{animeItem.title_native}</p>
                    <p className="list-item-text list-item-margin" dangerouslySetInnerHTML={{__html: animeItem.description}}/>
                    <p className="list-item-text list-item-margin"><b>Season: </b>{animeItem.season}</p>
                    {animeItem.episodes && <p className="list-item-text list-item-margin"><b>Episodes: </b>{animeItem.episodes}</p>}
                    <p className="list-item-text list-item-margin"><b>Start Date: </b> {animeItem.start_date}</p>
                    {animeItem.end_date && <p className="list-item-text list-item-margin"><b>End Date: </b>{animeItem.end_date}</p>}
                    <p className="list-item-text list-item-margin"><b>Status: </b>{animeItem.status}</p>
                    <div className="c-list-item-rating">
                      <p className="list-item-text"><b>Rating: </b></p>
                      <Rating
                        name="rating"
                        value={values.rating}
                        onChange={handleChange}
                        className="rating"
                      />
                    </div>
                    <div className="c-select">
                      <label className="list-item-text" htmlFor="user_status"><b>Status: </b></label>
                      <select
                        name="user_status"
                        value={values.user_status}
                        onChange={handleChange}
                        className="list-item-select"
                      >
                          <option className="select-hidden" value='none'>
                            Choose a status
                          </option>
                        {Object.keys(anime_user_status).map((item) => (
                          <option key={item} value={item}>
                            {anime_user_status[item]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <CustomButton
                      text="Back"
                      type="button"
                      svg="ArrowCircleLeft"
                      svgClassname="secondary-btn-icon"
                      btnClassname="secondary-btn button-margin"
                      textClassname="secondary-btn-text"
                      onClickFunction={() => navigate(-1)}
                    />
                    <CustomButton
                      text="Save"
                      type="submit"
                      svg="CheckCircle"
                      svgClassname="btn-icon"
                      btnClassname="primary-btn"
                      textClassname="primary-btn-text"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default AnimeListItem