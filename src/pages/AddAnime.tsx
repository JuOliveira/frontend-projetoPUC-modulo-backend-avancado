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
      {showSearch ? (
        <div>
          <div className="c-search-input">
            <CustomButton
              text="Back"
              onClickFunction={() => navigate(-1)}
              type="button"
              btnClassname="primary-btn"
              textClassname="primary-btn-text"
              svg="ArrowCircleLeft"
              svgClassname="btn-icon"
            />
            <input
              type="text"
              value={searchValue}
              placeholder="Search anime"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
              className="search-input"
            />
            <CustomButton
              text="Search"
              type="button"
              btnClassname="primary-btn"
              svgClassname="btn-icon"
              textClassname="primary-btn-text"
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
                  <ListItem
                    className="search-list-item"
                  >
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
              <div className="c-list-item">
                <img className="list-item-image" src={selectedResult!.coverImage.large}/>
                <div className="c-list-item-content">
                  <div className="c-list-item-title">
                    <p className="list-item-title">{selectedResult?.title.romaji}</p>
                    <Checkbox
                      name="is_favorite"
                      icon={<IconSelector svg="Favorite" classname="favorite-icon"/>}
                      checkedIcon={<IconSelector svg="FavoriteFilled" classname="favorite-icon"/>}
                      checked={values.is_favorite}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="list-item-text list-item-margin"><b>English title: </b>{selectedResult?.title.english}</p>
                  <p className="list-item-text list-item-margin"><b>Japanese title: </b>{selectedResult?.title.native}</p>
                  <p className="list-item-text list-item-margin" dangerouslySetInnerHTML={{__html: selectedResult!.description}}/>
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
                      {Object.keys(anime_user_status).map((item) => (
                        <option key={item} value={item}>
                          {anime_user_status[item]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <CustomButton
                      text="Cancel"
                      type="button"
                      svg="Cancel"
                      svgClassname="secondary-btn-icon"
                      btnClassname="secondary-btn button-margin"
                      textClassname="secondary-btn-text"
                      onClickFunction={() => cancelAddAnime(resetForm)}
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
      </div>
      )}
    </div>
  )
}

export default AddAnime