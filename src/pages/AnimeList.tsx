import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Grid from "@mui/material/Grid2"
import { Skeleton } from "@mui/material"

import CustomButton from "../components/CustomButton"
import ListCard from "../components/ListCard"
import ModalContainer from "../components/ModalContainer"
import IconSelector from "../components/IconSelector"
import { getAnimeList, deleteAnime } from "../services/anime_api"
import { AnimeListItemType } from "../types/anime_api_types"


function AnimeList() {
  const navigate = useNavigate()
  const [animeList, setAnimeList] = useState<AnimeListItemType[]>([])
  const [confirmModal, setConfirmModal] = useState<{state: boolean, id?: number}>({state: false, id: 0})
  const [resultModal, setResultModal] = useState(false)
  const [modalText, setModalText] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const handleDeleteAnime = async () => {
    handleCloseModal()
    const response = await deleteAnime(confirmModal.id as number)

    if (response) {
      setModalText(response.message)

      setResultModal(true)
    }
    

    const newList = await getAnimeList()

    if (newList) {
      setAnimeList(newList.data)
    }
  }

  const handleOpenModal = (id: number) => {
    setConfirmModal({state: true, id: id})
  }

  const handleCloseModal = () => {
    setConfirmModal({state: false})
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getAnimeList()

      if (result) {
        setAnimeList(result.data)
        setLoading(false)
      }
    }

    fetchData()
  },[])

  return (
    <div className="c-list">
        <div className="c-schedule-title">
          <IconSelector
            svg="List"
            classname="schedule-title-icon"
          />
          <h1 className="season-schedule-title">My Lists</h1>
        </div>
        <h2 className="list-subtitle">Anime List</h2>
        <CustomButton
          text="Add"
          onClickFunction={() => navigate('/add-anime')}
          type="button"
          btnClassname="primary-btn list-btn-position"
          textClassname="primary-btn-text"
          svg="AddCircle"
          svgClassname="btn-icon"
        />
      <Grid container spacing={2}>
        {
          loading ?          
          Array.from({length:6}, (_, index) => (
            <Grid size={2} key={index}>
              <Skeleton
                width={230}
                height={520}
                variant="rectangular"
                animation="wave"
                style={{
                  borderRadius: '5px',
                }}
              />
          </Grid>
          ))          
          :
          animeList.length !== 0 && animeList.map(value => (
            <Grid size={2} key={value.id}>
              <ListCard
                id={value.id}
                coverImage={value.cover_image_large}
                title_romaji={value.title_romaji}
                rating={value.rating}
                user_status={value.user_status}
                is_favorite={value.is_favorite}
                onClickFunction={() => handleOpenModal(value.id)}
                url="/anime-list-item/"
              />
              <ModalContainer
                open={confirmModal.state}
                handleClose={handleCloseModal}
                title="Delete anime from list?"
                icon='Delete'
              >
                <p>Are you sure you want to delete this anime from the list?</p>
                <div className="c-modal-controls">
                  <CustomButton
                    text="Cancel"
                    type="button"
                    svg="Cancel"
                    svgClassname="secondary-btn-icon"
                    btnClassname="secondary-btn button-margin"
                    textClassname="secondary-btn-text"
                    onClickFunction={handleCloseModal}
                  />
                  <CustomButton
                    text="Delete"
                    type="button"
                    svg="CheckCircle"
                    svgClassname="btn-icon"
                    btnClassname="primary-btn"
                    textClassname="primary-btn-text"
                    onClickFunction={handleDeleteAnime}
                  />
                </div>
              </ModalContainer>
            </Grid>
          ))
        }
      </Grid>
      <ModalContainer
        open={resultModal}
        handleClose={() => setResultModal(false)}
        title={modalText}
        icon='CheckCircle'
      >
        <CustomButton
          text="OK"
          type="button"
          svg="CheckCircle"
          svgClassname="btn-icon"
          btnClassname="primary-btn button-width"
          textClassname="primary-btn-text"
          onClickFunction={() => setResultModal(false)}
        />
      </ModalContainer>
    </div>
  )
}

export default AnimeList