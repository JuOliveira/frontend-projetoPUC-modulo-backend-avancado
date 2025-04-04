import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Grid from "@mui/material/Grid2"

import CustomButton from "../components/CustomButton"
import ListCard from "../components/ListCard"
import ModalContainer from "../components/ModalContainer"
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
    <div>
      MangaList
      <CustomButton
        text="Add"
        onClickFunction={() => navigate('/add-manga')}
        type="button"
        btnClassname="primary-btn"
        svg="AddCircle"
        svgClassname="btn-icon"
      />
      <Grid container spacing={2}>
        {mangaList.length !== 0 && mangaList.map(value => (
          <Grid size={3} key={value.id}>
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
              icon='CheckCircle'
            >
              <p>Are you sure you want to delete this manga from the list?</p>
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
          svgClassname="modal-btn-icon"
          btnClassname="modal-btn"
          onClickFunction={() => setResultModal(false)}
        />
      </ModalContainer>
    </div>
  )
}

export default MangaList