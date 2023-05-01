import { Link, useLocation } from "react-router-dom"
import logo from '/npe-green.svg'

import { ParksDropdown } from "../Dropdown/ParksDropdown";
import { Logo, StyledHeader, StyledNavBar } from "../styled/StyledNavBar";


export const NavBar = () => {
    const location = useLocation();
    const showNavSearch = ['park', 'state'].some(el => location.pathname.includes(el)) 
    
    return(
        <StyledHeader>
            <StyledNavBar>
                
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
                    <Link to='/about' >
                        <button>
                            About
                        </button>
                    </Link>
                </div>
                
            </StyledNavBar>
        </StyledHeader>
    )
}
