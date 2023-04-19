import { useContext } from 'react'
import {  Link, Outlet, useNavigate } from 'react-router-dom'
import ParkContext from './hooks/ParkContext'
import { Dropdown } from './components/Dropdown'
import { USMap } from './components/USMap'

import viteLogo from '/vite.svg'
import './App.css'

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
      <nav style={{backgroundColor: 'rgb(80, 119,67)'}}>
        <div className="container">
          
          <div className="logo">
            <Link to='/'>
              <img src={viteLogo} alt="Vite Logo" />
            </Link>
          </div>
          
          <Dropdown
            placeholder='Search for a park'
            options={parks.map((park) => ({value: park.parkCode, title: park.fullName}))}
            // options={Array(5).fill('6').map((_, i) => ({value: i + '', title: `Option ${i}`}))}
            onSelect={(option) => handleParkSelect(option)}
          />
          
          <div className="links">
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              About
            </a>
            <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
              Contact
            </a>
          </div>
        </div>
        
      </nav>
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
