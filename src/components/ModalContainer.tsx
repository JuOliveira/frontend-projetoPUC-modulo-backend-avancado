import { Dialog, IconButton } from "@mui/material"

import IconSelector from "./IconSelector"

type ModalContainerProps = {
  open: boolean,
  handleClose: () => void,
  icon: string,
  title: string,
  children: React.ReactNode
}

function ModalContainer(props: ModalContainerProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className="modal-container"
    >
        <IconButton
          onClick={props.handleClose}
          className="modal-close-button"
        >
          <IconSelector svg="Cancel" classname="modal-closeBtn-icon"/>
        </IconButton>
        <IconSelector svg={props.icon} classname="modal-icon"/>
        <div className="modal-content-container">
          <h2 className="modal-title">{props.title}</h2>
          {props.children}
        </div>
    </Dialog>
  )
}

export default ModalContainer