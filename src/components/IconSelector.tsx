import AddCircle from '../assets/svg/add_circle.svg?react'
import Cancel from '../assets/svg/cancel.svg?react'
import CalendarMonth from '../assets/svg/calendar_month.svg?react'
import List from '../assets/svg/list.svg?react'
import Home from '../assets/svg/home.svg?react'
import ArrowCircleLeft from '../assets/svg/arrow_circle_left.svg?react'
import CheckCircle from '../assets/svg/check_circle.svg?react'


type IconsType = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

function IconSelector({svg, classname}: {svg: string, classname: string}) {
  const Icons:  IconsType = {
    "AddCircle": AddCircle,
    "Cancel": Cancel,
    "CalendarMonth": CalendarMonth,
    "List": List,
    "Home": Home,
    "ArrowCircleLeft": ArrowCircleLeft,
    "CheckCircle": CheckCircle,
  }

  const Icon = Icons[svg]

  return (
    Icon ? <Icon className={classname}/> : null
  )
}

export default IconSelector