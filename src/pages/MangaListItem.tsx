import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Checkbox, Rating } from "@mui/material"
import { Formik } from "formik"

import CustomButton from "../components/CustomButton"
import IconSelector from "../components/IconSelector"
import { manga_user_status } from "../utils/constants"
import { InputMangaItem } from "../types/manga_api_types"
import { getManga, editManga } from "../services/manga_api"

function MangaListItem() {
  const { mangaId } = useParams()
  const navigate = useNavigate()
  const [mangaItem, setMangaItem] = useState<InputMangaItem>()

  const onFormSubmit = async (values: InputMangaItem) => {
    console.log('values', values)
    const response = await editManga(values)
    
    if (response) {
      navigate('/manga-list')
    }
  }

  useEffect(() => {
    async function fetchMangaData() {
      const response = await getManga(Number(mangaId))

      console.log('response', response)
      const formattedGenres: string[] = []
      response.data.genres.forEach(genre => {
        formattedGenres.push(genre.name)
      })

      const formattedResponse: InputMangaItem = {
        id: response.data.id,
        title_romaji: response.data.title_romaji,
        title_native: response.data.title_native,
        title_english: response.data.title_english,
        description: response.data.description,
        cover_image_medium: response.data.cover_image_medium,
        cover_image_large: response.data.cover_image_large,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
        status: response.data.status,
        volumes: response.data.volumes,
        chapters: response.data.chapters,
        story: response.data.story,
        art: response.data.art,
        rating: response.data.rating,
        user_status: response.data.user_status,
        is_favorite: response.data.is_favorite,
        genres: formattedGenres,
      }

      setMangaItem(formattedResponse)
    }

    fetchMangaData()
  },[mangaId])

  return (
    <div>
      {mangaItem && (
        <Formik
          initialValues={{
            ...mangaItem,
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
                <img src={mangaItem.cover_image_large} className="list-item-image"/>
                <div className="c-list-item-content">
                  <div className="c-list-item-title">
                    <p className="list-item-title">{mangaItem.title_romaji}</p>
                    <Checkbox
                      name="is_favorite"
                      icon={<IconSelector svg="Favorite" classname="favorite-icon"/>}
                      checkedIcon={<IconSelector svg="FavoriteFilled" classname="favorite-icon"/>}
                      checked={values.is_favorite}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="list-item-text list-item-margin"><b>English title: </b>{mangaItem.title_english}</p>
                    <p className="list-item-text list-item-margin"><b>Japanese title: </b>{mangaItem.title_native}</p>
                    <p className="list-item-text list-item-margin" dangerouslySetInnerHTML={{__html: mangaItem.description}}/>
                    {mangaItem.volumes && <p className="list-item-text list-item-margin"><b>Volumes: </b>{mangaItem.volumes}</p>}
                    {mangaItem.chapters && <p className="list-item-text list-item-margin"><b>Chapters: </b>{mangaItem.chapters}</p>}
                    <p className="list-item-text list-item-margin"><b>Start Date: </b>{mangaItem.start_date}</p>
                    {mangaItem.end_date && <p className="list-item-text list-item-margin"><b>End Date: </b>{mangaItem.end_date}</p>}
                    <p className="list-item-text list-item-margin"><b>Story: </b>{mangaItem.story}</p>
                    <p className="list-item-text list-item-margin"><b>Art: </b>{mangaItem.art}</p>
                    <p className="list-item-text list-item-margin"><b>Status: </b>{mangaItem.status}</p>
                    <div className="c-list-item-rating">
                      <p className="list-item-text"><b>Rating: </b></p>
                      <Rating
                        name="rating"
                        value={values.rating}
                        onChange={handleChange}
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
                        {Object.keys(manga_user_status).map((item) => (
                          <option key={item} value={item}>
                            {manga_user_status[item]}
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

export default MangaListItem