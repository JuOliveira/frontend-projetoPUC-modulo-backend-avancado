import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { StyledEngineProvider } from '@mui/material/styles'

import { useAppDispatch } from './types/withTypes'
import { fetchSeasonList } from './features/seasons/seasonsSlice'
import Root from './pages/Root'
import SeasonList from './pages/SeasonList'
import SeasonSchedule from './pages/SeasonSchedule'
import MyLists from './pages/MyLists'
import AnimeList from './pages/AnimeList'
import AnimeListItem from './pages/AnimeListItem'
import AddAnime from './pages/AddAnime'
import MangaList from './pages/MangaList'
import MangaListItem from './pages/MangaListItem'
import AddManga from './pages/AddManga'
import './styles/style.scss'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSeasonList())
  },[dispatch])

  return (
    <StyledEngineProvider injectFirst>
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route index element={<SeasonList/>}/>
          <Route path='season-schedule' element={<SeasonSchedule/>}/>
          <Route path='my-lists' element={<MyLists/>}/>
          <Route path='anime-list' element={<AnimeList/>}/>
          <Route path='anime-list-item/:animeId' element={<AnimeListItem/>}/>
          <Route path='add-anime' element={<AddAnime/>}/>
          <Route path='manga-list' element={<MangaList/>}/>
          <Route path='manga-list-item/:mangaId' element={<MangaListItem/>}/>
          <Route path='add-manga' element={<AddManga/>}/>
        </Route>
      </Routes>
    </StyledEngineProvider>
  )
}

export default App
