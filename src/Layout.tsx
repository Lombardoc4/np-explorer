import { useContext, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

import { USMap } from './components/USMap'
import { NavBar } from './components/NavBar'
import ScrollToTop from './components/ScrollToTop'

import ParkContext from './utils/hooks/ParkContext'

import './styles/App.css'
import { Footer } from './components/Footer'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/globalStyles'
import theme from './styles/theme'




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
          
          {/* {memoUSMap} */}
      </main>
      
      
     <Footer/>
    </ThemeProvider>
  )
}

export default App
