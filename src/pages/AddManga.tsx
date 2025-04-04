
import { useState } from "react"
import { useNavigate } from "react-router"
import { Checkbox, List, ListItem, ListItemButton, Rating } from "@mui/material"
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

  const handleSearch = async (query: string) => {
    const result = await searchManga(query)

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
    console.log('values', values)
    const response = await addManga(values)

    if (response) {
      console.log('response', response)
      actions.resetForm()
      navigate('/manga-list')
    }
  }

  return (
    <div>
      AddManga
      <CustomButton
        text="Back"
        onClickFunction={() => navigate(-1)}
        type="button"
        btnClassname="primary-btn"
        svg="ArrowCircleLeft"
        svgClassname="btn-icon"
      />
      {showSearch ? (
        <div>
          <div>
            <input
              type="text"
              value={searchValue}
              placeholder="Search manga"
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
            end_date: `${selectedResult!.endDate.day}-${selectedResult!.endDate.month}-${selectedResult!.endDate.year}`,
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
                    {Object.keys(manga_user_status).map((item) => (
                      <option key={item} value={item}>
                        {manga_user_status[item]}
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
                      onClickFunction={() => cancelAddManga(resetForm)}
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

export default AddManga