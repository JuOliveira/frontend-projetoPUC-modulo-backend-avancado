import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Grid from "@mui/material/Grid2"

import CustomButton from "../components/CustomButton"
import ListCard from "../components/ListCard"
import ModalContainer from "../components/ModalContainer"
import { getAnimeList, deleteAnime } from "../services/anime_api"
import { AnimeListItemType } from "../types/anime_api_types"
import { anime_user_status } from "../utils/constants"



function AnimeList() {
  const navigate = useNavigate()
  const [animeList, setAnimeList] = useState<AnimeListItemType[]>([])
  const [confirmModal, setConfirmModal] = useState<{state: boolean, id?: number}>({state: false, id: 0})
  const [resultModal, setResultModal] = useState(false)
  const [modalText, setModalText] = useState<string>('')

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
      }
    }

    fetchData()
  },[])

  return (
    <div>
      AnimeList
      <CustomButton
        text="Add"
        onClickFunction={() => navigate('/add-anime')}
        type="button"
        btnClassname="primary-btn"
        svg="AddCircle"
        svgClassname="btn-icon"
      />
      <Grid container spacing={2}>
        {animeList.length !== 0 && animeList.map(value => (
          <Grid size={3} key={value.id}>
            <ListCard
              id={value.id}
              coverImage={value.cover_image_large}
              title_romaji={value.title_romaji}
              rating={value.rating}
              user_status={anime_user_status[value.user_status]}
              is_favorite={value.is_favorite}
              onClickFunction={() => handleOpenModal(value.id)}
              url="/anime-list-item/"
            />
            <ModalContainer
              open={confirmModal.state}
              handleClose={handleCloseModal}
              title="Delete anime from list?"
              icon='CheckCircle'
            >
              <p>Are you sure you want to delete this anime from the list?</p>
              <div>
                <CustomButton
                  text="Cancel"
                  type="button"
                  svg="Cancel"
                  svgClassname="modal-btn-icon"
                  btnClassname="modal-btn"
                  onClickFunction={handleCloseModal}
                />
                <CustomButton
                  text="Delete"
                  type="button"
                  svg="CheckCircle"
                  svgClassname="modal-btn-icon"
                  btnClassname="modal-btn"
                  onClickFunction={handleDeleteAnime}
                />
              </div>
            </ModalContainer>
          </Grid>
        ))}
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
          svgClassname="modal-btn-icon"
          btnClassname="modal-btn"
          onClickFunction={() => setResultModal(false)}
        />
      </ModalContainer>
    </div>
  )
}

export default AnimeList