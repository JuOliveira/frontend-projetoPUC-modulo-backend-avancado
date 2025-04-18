import AddCircle from '../assets/svg/add_circle.svg?react'
import Cancel from '../assets/svg/cancel.svg?react'
import CalendarMonth from '../assets/svg/calendar_month.svg?react'
import List from '../assets/svg/list.svg?react'
import Home from '../assets/svg/home.svg?react'
import ArrowCircleLeft from '../assets/svg/arrow_circle_left.svg?react'
import CheckCircle from '../assets/svg/check_circle.svg?react'
import Delete from '../assets/svg/delete.svg?react'
import Favorite from '../assets/svg/favorite.svg?react'
import FavoriteFilled from '../assets/svg/favorite-filled.svg?react'
import Search from '../assets/svg/search.svg?react'
import AppLogo from '../assets/svg/AppLogo.svg?react'
import LiveTV from '../assets/svg/live_tv.svg?react'
import MenuBook from '../assets/svg/menu_book.svg?react'


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
    "Delete": Delete,
    "Favorite": Favorite,
    "FavoriteFilled": FavoriteFilled,
    "Search": Search,
    "AppLogo": AppLogo,
    "LiveTV": LiveTV,
    "MenuBook": MenuBook,
  }

  const Icon = Icons[svg]

  return (
    Icon ? <Icon className={classname}/> : null
  )
}

export default IconSelector