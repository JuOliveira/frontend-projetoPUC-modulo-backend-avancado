import { useState } from "react"
import { useNavigate } from "react-router"
import { Formik, FormikHelpers, FormikState } from "formik"
import { Checkbox, Rating } from "@mui/material"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'

import CustomButton from "../components/CustomButton"
import SearchCard from "../components/SearchCard";
import { addAnime, searchAnime } from "../services/anime_api"
import { InputAnimeItem, ResponseAnimeItem } from "../types/anime_api_types"
import IconSelector from "../components/IconSelector"
import { anime_user_status, status} from "../utils/constants"

function AddAnime() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<ResponseAnimeItem[]>([])
  const [showSearch, setShowSearch] = useState(true)
  const [selectedResult, setSelectedResult] = useState<ResponseAnimeItem>()

  const handleSearch = async (query: string) => {
    const result = await searchAnime(query)

    if (result) {
      setSearchResults(result.data.Page.media)
      console.log('result', result)
    }
  }

  const selectResult = (id: number) => {
    setShowSearch(false)
    const selectedItem = searchResults.find(item => item.id === id)

    setSelectedResult(selectedItem)
  }

  const cancelAddAnime = (resetForm:  (nextState?: Partial<FormikState<InputAnimeItem>> | undefined) => void) => {
    resetForm()
    setShowSearch(true)
  }

  const onFormSubmit = async (values: InputAnimeItem, actions: FormikHelpers<InputAnimeItem>) => {
    console.log('values', values)
   const response = await addAnime(values)

    if (response) {
      console.log('response', response)
      actions.resetForm()
      navigate('/anime-list')
    }
  }

  return (
    <div className="c-search">
      <h1 className="search-title">Add Anime</h1>
      <CustomButton
        text="Back"
        onClickFunction={() => navigate(-1)}
        type="button"
        btnClassname="primary-btn"
        textClassname="primary-btn-text"
        svg="ArrowCircleLeft"
        svgClassname="btn-icon"
      />
      {showSearch ? (
        <div>
          <div>
            <input
              type="text"
              value={searchValue}
              placeholder="Search anime"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            />
            <CustomButton
              text="Search"
              type="button"
              btnClassname="search-btn"
              svgClassname="search-icon-btn"
              svg="Search"
              onClickFunction={() => handleSearch(searchValue)}
            />
          </div>
          <div>
            <List>
              {searchResults.length !== 0 && searchResults.map(result => (
                <ListItemButton 
                  key={result.id}
                  onClick={() => selectResult(result.id)}
                >
                  <ListItem>
                    <SearchCard
                      coverImage={result.coverImage.large}
                      title_romaji={result.title.romaji}
                      description={result.description}
                      start_date={`${result.startDate.day}/${result.startDate.month}/${result.startDate.year}`}
                      status={status[result.status]}
                    />
                  </ListItem>
                </ListItemButton>
              ))}
            </List>
          </div>
        </div>
      ) : (
      <div>
        <Formik
          initialValues ={{
            id: selectedResult!.id,
            title_romaji: selectedResult!.title.romaji,
            title_native: selectedResult!.title.native,
            title_english: selectedResult!.title.english,
            description: selectedResult!.description,
            cover_image_medium: selectedResult!.coverImage.medium,
            cover_image_large: selectedResult!.coverImage.large,
            start_date: `${selectedResult!.startDate.day}-${selectedResult!.startDate.month}-${selectedResult!.startDate.year}`,
            end_date: selectedResult!.endDate.day === null ? ' ' : `${selectedResult!.endDate.day}-${selectedResult!.endDate.month}-${selectedResult!.endDate.year}`,
            season: `${selectedResult!.season} ${selectedResult!.seasonYear}`,
            status: selectedResult!.status,
            episodes: selectedResult!.episodes,
            rating: 0,
            user_status: 'none',
            is_favorite: false,
            genres: selectedResult!.genres,
          }}
          onSubmit={(values,actions) => onFormSubmit(values,actions)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <img
                src={selectedResult!.coverImage.large}
              />
              <div>
                  <div>
                    <p>{selectedResult?.title.romaji}</p>
                    <Checkbox
                      name="is_favorite"
                      icon={<IconSelector svg="Favorite" classname="favorite-input"/>}
                      checkedIcon={<IconSelector svg="FavoriteFilled" classname="favorite-input"/>}
                      checked={values.is_favorite}
                      onChange={handleChange}
                    />
                  </div>
                  <p>English title: {selectedResult?.title.english}</p>
                  <p>{selectedResult?.description}</p>
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
                  <div>
                    <CustomButton
                      text="Cancel"
                      type="button"
                      svg="Cancel"
                      svgClassname="form-btn-icon"
                      btnClassname="form-btn"
                      onClickFunction={() => cancelAddAnime(resetForm)}
                    />
                    <CustomButton
                      text="Save"
                      type="submit"
                      svg="CheckCircle"
                      svgClassname="form-btn-icon"
                      btnClassname="form-btn"
                    />
                  </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      )}
    </div>
  )
}

export default AddAnime