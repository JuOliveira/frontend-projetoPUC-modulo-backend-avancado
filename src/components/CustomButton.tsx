import { Button } from "@mui/material"

import IconSelector from "./IconSelector"

type CustomButtonType = {
  text?: string,
  onClickFunction?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  type: "button" | "submit" | "reset" | undefined,
  btnClassname: string,
  svg: string,
  svgClassname: string,
}

function CustomButton(props: CustomButtonType) {
  const { text, onClickFunction, type, btnClassname, svg, svgClassname } = props
  return (
    <Button
      type={type}
      onClick={onClickFunction}
      className={btnClassname}
    >
      <IconSelector svg={svg} classname={svgClassname}/>
      { text && <p>{text}</p> }
    </Button>
  )
}

export default CustomButton