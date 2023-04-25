import { useContext } from 'react'
import {  Link, Outlet, useNavigate } from 'react-router-dom'
import ParkContext from './hooks/ParkContext'
import { Dropdown } from './components/Dropdown'
import { USMap } from './components/USMap'

import './App.css'
import { NavBar } from './components/NavBar'

interface Image {
  id: number
  url: string
  title: string
  description: string
}


function App() {
  const parks = useContext(ParkContext);
  
  const navigate = useNavigate();
  
  
  const handleParkSelect = (park:any) => {
    navigate(`/park/${park}`)
  }
  
  if (!parks) return <div>Loading...</div>;
  
  return (
    <>
      <NavBar>
        <Dropdown
              placeholder='Search for a park'
              options={parks.map((park) => ({value: park.parkCode, title: park.fullName}))}
              // options={Array(5).fill('6').map((_, i) => ({value: i + '', title: `Option ${i}`}))}
              onSelect={(option) => handleParkSelect(option)}
            />
      </NavBar>
      <main>
        
        
          
          <Outlet />
          
          <USMap/>
        
      </main>
      
      <footer style={{minHeight: '300px', marginTop: '2em', backgroundColor: '#000', color: '#fff', padding: '2em 0' }}>
        <div className="container">
          <p>Footer</p>
        </div>
        
      </footer>
    </>
  )
}

export default App
