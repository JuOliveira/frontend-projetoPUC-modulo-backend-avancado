import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Grid from "@mui/material/Grid2"

import CustomButton from "../components/CustomButton"
import ListCard from "../components/ListCard"
import ModalContainer from "../components/ModalContainer"
import IconSelector from "../components/IconSelector"
import { MangaListItemType } from "../types/manga_api_types"
import { getMangaList, deleteManga } from "../services/manga_api"
import { manga_user_status } from "../utils/constants"

function MangaList() {
  const navigate = useNavigate()
  const [mangaList, setMangaList] = useState<MangaListItemType[]>([])
  const [confirmModal, setConfirmModal] = useState<{state: boolean, id?: number}>({state: false, id: 0})
  const [resultModal, setResultModal] = useState(false)
  const [modalText, setModalText] = useState<string>('')

  const handleDeleteManga = async () => {
    handleCloseModal()
    const response = await deleteManga(confirmModal.id as number)

    if (response) {
      setModalText(response.message)

      setResultModal(true)
    }
    

    const newList = await getMangaList()

    if (newList) {
      setMangaList(newList.data)
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
      const result = await getMangaList()

      if (result) {
        setMangaList(result.data)
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
      <h2 className="list-subtitle">Manga List</h2>
      <CustomButton
        text="Add"
        onClickFunction={() => navigate('/add-manga')}
        type="button"
        btnClassname="primary-btn list-btn-position"
        textClassname="primary-btn-text"
        svg="AddCircle"
        svgClassname="btn-icon"
      />
      <Grid container spacing={2}>
        {mangaList.length !== 0 && mangaList.map(value => (
          <Grid size={2} key={value.id}>
            <ListCard
              id={value.id}
              coverImage={value.cover_image_large}
              title_romaji={value.title_romaji}
              rating={value.rating}
              user_status={manga_user_status[value.user_status]}
              is_favorite={value.is_favorite}
              onClickFunction={() => handleOpenModal(value.id)}
              url="/manga-list-item/"
            />
            <ModalContainer
              open={confirmModal.state}
              handleClose={handleCloseModal}
              title="Delete manga from list?"
              icon='Delete'
            >
              <p>Are you sure you want to delete this manga from the list?</p>
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
                  onClickFunction={handleDeleteManga}
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
          svgClassname="btn-icon"
          btnClassname="primary-btn button-width"
          textClassname="primary-btn-text"
          onClickFunction={() => setResultModal(false)}
        />
      </ModalContainer>
    </div>
  )
}

export default MangaList