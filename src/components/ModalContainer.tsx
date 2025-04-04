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
          <IconSelector svg="Close" classname="modal-closeBtn-icon"/>
        </IconButton>
        <div className="modal-content-container">
          <IconSelector svg={props.icon} classname="modal-icon"/>
          <h2>{props.title}</h2>
          {props.children}
        </div>
    </Dialog>
  )
}

export default ModalContainer