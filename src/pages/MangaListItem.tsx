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
              <div>
                <img
                  src={mangaItem.cover_image_large}
                />
                <div>
                  <div>
                    <p>{mangaItem.title_romaji}</p>
                    <Checkbox
                      name="is_favorite"
                      icon={<IconSelector svg="Favorite" classname="favorite-input"/>}
                      checkedIcon={<IconSelector svg="FavoriteFilled" classname="favorite-input"/>}
                      checked={values.is_favorite}
                      onChange={handleChange}
                    />
                  </div>
                  <p>English title: {mangaItem.title_english}</p>
                  <p>Japanese title: {mangaItem.title_native}</p>
                  <p>{mangaItem.description}</p>
                  {mangaItem.volumes && <p>Volumes: {mangaItem.volumes}</p>}
                  {mangaItem.chapters && <p>Chapters: {mangaItem.chapters}</p>}
                  <p>Start Date: {mangaItem.start_date}</p>
                  {mangaItem.end_date && <p>End Date: {mangaItem.end_date}</p>}
                  <p>Story: {mangaItem.story}</p>
                  <p>Art: {mangaItem.art}</p>
                  <p>Status: {mangaItem.status}</p>
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
                    {Object.keys(manga_user_status).map((item) => (
                      <option key={item} value={item}>
                        {manga_user_status[item]}
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

export default MangaListItem