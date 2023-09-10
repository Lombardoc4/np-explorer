import { Link, useLocation } from "react-router-dom"
import styled from "styled-components";

import { ParksDropdown } from "../Dropdown/ParksDropdown";
import logo from '../../assets/npe-green.svg'
import { useEffect, useRef } from "react";
import useOnScreen from "../../utils/hooks/useOnScreen";


export const NavBar = () => {
    const location = useLocation();
    const showNavSearch = location.pathname.length > 1;

    // Hide when offscreen
    const otherParksRef = useRef(document.querySelector('#other-parks'));
    const offscreen = useOnScreen(otherParksRef, -50);

    useEffect(() => {
        // Confirms ref is set
        if (!otherParksRef.current)
            otherParksRef.current = document.querySelector('#other-parks')

        // This close the dropdown
        document.documentElement.click();
    }, [offscreen])

    return(
            <StyledNavBar $sticky={!offscreen}>
                <div className="container">

                    {/* Left */}
                    <div className="logo">
                        <Link to='/'>
                            {/* <Logo src={logo} alt="National Park Exp Logo"/> */}
                            <img src={logo} alt="NPS Logo"/>
                        </Link>
                    </div>

                    {/* Middle */}
                    { showNavSearch && <ParksDropdown/>}

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


interface NavProps {
    $sticky: boolean
}

export const StyledNavBar = styled.nav<NavProps>`
    position: ${({$sticky}) => $sticky ? 'sticky' : 'initial'};
    top: 0;
    height: 70px;
    z-index: ${({ theme }) => theme.zIndex.navbar};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 1em -0.5em rgba(0,0,0,0.5);
    /* padding: 0.5em 0; */

    a {
        display: flex;
    }

    .container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo {
        margin-right: auto;
    }

    @media (min-width: 768px) {
        padding: 0.75em 0;
    }
`;

export const Logo = styled.div``;