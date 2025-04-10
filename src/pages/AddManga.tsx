
import { useState } from "react"
import { useNavigate } from "react-router"
import { 
  Checkbox, 
  List, 
  ListItem, 
  ListItemButton, 
  Rating,
  Skeleton, 
} from "@mui/material"
import { Formik, FormikHelpers, FormikState } from "formik"

import CustomButton from "../components/CustomButton"
import SearchCard from "../components/SearchCard"
import IconSelector from "../components/IconSelector"
import { status, manga_user_status } from "../utils/constants"
import { addManga, searchManga } from "../services/manga_api"
import { MangaSearchItem, InputMangaItem, StaffItem } from "../types/manga_api_types"

function AddManga() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<MangaSearchItem[]>([])
  const [showSearch, setShowSearch] = useState(true)
  const [selectedResult, setSelectedResult] = useState<MangaSearchItem>()
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query: string) => {
    setLoading(true)
    const result = await searchManga(query)

    if (result) {
      setSearchResults(result.data.Page.media)
    }

    setLoading(false)
  }

  const selectResult = (id: number) => {
    setShowSearch(false)
    const selectedItem = searchResults.find(item => item.id === id)

    setSelectedResult(selectedItem)
  }

  const cancelAddManga = (resetForm:  (nextState?: Partial<FormikState<InputMangaItem>> | undefined) => void) => {
    resetForm()
    setShowSearch(true)
  }

  const getFieldString = () => {
    const string = selectedResult?.staff.edges.find((item: StaffItem) => item.role === 'Story & Art')
    if (string) {
      return string.node.name.full
    }
  }

  const onFormSubmit = async (values: InputMangaItem, actions: FormikHelpers<InputMangaItem>) => {
    const response = await addManga(values)

    if (response) {
      actions.resetForm()
      navigate('/manga-list')
    }
  }

  return (
    <div className="c-search">
      <h1 className="search-title">Add Manga</h1>
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
              placeholder="Search manga"
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
            {
              loading ?
              Array.from({length:12}, (_,index) => 
                <Skeleton
                  key={index}
                  height={320}
                  variant="rectangular"
                  animation="wave"
                  style={{
                    width: '100%',
                    borderRadius: '5px',
                    margin: '15px',
                  
                  }}
                />
              )
              :
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
            }
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
            end_date: selectedResult!.endDate.day === null ? '' : `${selectedResult!.endDate.day}-${selectedResult!.endDate.month}-${selectedResult!.endDate.year}`,
            status: selectedResult!.status,
            volumes: selectedResult!.volumes,
            chapters: selectedResult!.chapters,
            story: getFieldString()!,
            art: getFieldString()!,
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
                    <label className="list-item-text" htmlFor="user_status"><b>User Status: </b></label>
                    <select
                      name="user_status"
                      value={values.user_status}
                      onChange={handleChange}
                      className="list-item-select"
                    >
                      <option className="select-hidden" value='none'>
                        Choose a status
                      </option>
                      {manga_user_status.map((item) => (
                        <option key={item} value={item}>
                          {item}
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
                      onClickFunction={() => cancelAddManga(resetForm)}
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

export default AddManga