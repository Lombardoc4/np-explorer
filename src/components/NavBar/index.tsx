import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/npe-green.svg'

import { ParksDropdown } from "../Dropdown/ParksDropdown";
import { StyledNavBar } from "../styled/StyledNavBar";
import { StyledContainer } from "../styled/StyledContainer";


export const NavBar = () => {
    const location = useLocation();
    const showNavSearch = ['park', 'state'].some(el => location.pathname.includes(el)) 
    
    return(
            <StyledNavBar>
                <div className="container">
                    
                {/* Left */}
                <div className="side">
                    <Link to='/'>
                        {/* <Logo src={logo} alt="National Park Exp Logo"/> */}
                        <img src={logo} alt="NPS Logo"/>
                    </Link>
                </div>
                
                {/* Middle */}
                { showNavSearch && 
                    <div className="main">
                        <ParksDropdown/>
                    </div>
                }
                
                {/* Right */}
                <div className="side right">
                    {/* <Link to='/about' >
                        <button>
                            About
                        </button>
                    </Link> */}
                </div>
                </div>
                
            </StyledNavBar>
    )
}
