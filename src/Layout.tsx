import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import ParkContext from './hooks/ParkContext'
import { USMap } from './components/USMap'

import './App.css'
import { NavBar } from './components/NavBar'
import ScrollToTop from './components/ScrollToTop'
import { ParksDropdown } from './components/Dropdown/ParksDropdown'

interface NavSearch {
  navSearchBar?: boolean
}

function App({navSearchBar = true} : NavSearch) {
  const parks = useContext(ParkContext);
  
  
  if (!parks) return <div>Loading...</div>;
  
  return (
    <>
      <ScrollToTop/>
      <NavBar>
        {navSearchBar ? <ParksDropdown/> : <></> }
      </NavBar>
      
      <main>
          <Outlet />
          <USMap/>
      </main>
      
      <footer style={{minHeight: '300px', backgroundColor: '#000', color: '#fff', padding: '2em 0' }}>
        <div className="container">
          <p>Footer</p>
        </div>
      </footer>
    </>
  )
}

export default App
