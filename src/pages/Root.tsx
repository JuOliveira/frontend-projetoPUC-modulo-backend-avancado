import Header from '../components/Header'
import { Outlet } from 'react-router'

function Root() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Root