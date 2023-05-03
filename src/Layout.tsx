import { useContext, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

import { USMap } from './components/USMap'
import { NavBar } from './components/NavBar'
import ScrollToTop from './components/ScrollToTop'

import ParkContext from './utils/hooks/ParkContext'

import './App.css'
import { Footer } from './components/Footer'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './globalStyles'


const theme = {
  colors: {
    primary: 'hsl(105, 28%, 43%)',
    secondary: 'hsl(40, 44%, 63%)',
    accent: 'hsl(93, 43%, 43%)',
    black: '#000000',
    white: '#fff',
    gray: '#f1f1f1',
  }
};

function App({children} : {children?: JSX.Element}) {
  const parks = useContext(ParkContext);
  const memoUSMap = useMemo(() => <USMap/>, [parks]);
  
  if (!parks) return <div>Loading...</div>;
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <ScrollToTop/>
      
      <NavBar/>
      
      <main>
          <Outlet />
          {children}
          {memoUSMap}
      </main>
      
      
     <Footer/>
    </ThemeProvider>
  )
}

export default App
