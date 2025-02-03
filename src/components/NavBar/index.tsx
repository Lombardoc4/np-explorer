import { Link, useLocation } from "react-router";
import styled from "styled-components";

import { ParksDropdown } from "../Dropdown/ParksDropdown";
import logo from "../../assets/npe-green.svg";
import { useEffect, useRef } from "react";
import useOnScreen from "../../utils/hooks/useOnScreen";

export const NavBar = () => {

    const location = useLocation();

    // Hide when offscreen
    const otherParksRef = useRef(document.querySelector("#other-parks"));
    const offscreen = useOnScreen(otherParksRef, -50);

    useEffect(() => {
        // Confirms ref is set
        if (!otherParksRef.current) otherParksRef.current = document.querySelector("#other-parks");

        // This close the dropdown
        document.documentElement.click();
    }, [offscreen]);

    return (
        <nav className='z-30 bg-white top-0 h-[64px] shadow fixed start-0 end-0 flex'>
            <div className='container mx-auto flex justify-center items-center'>
                {/* Left */}
                <div className='mr-auto'>
                    <Link to='/' className='flex'>
                        {/* <Logo src={logo} alt="National Park Exp Logo"/> */}
                        <img src={logo} alt='NPS Logo' className="max-w-20" />
                    </Link>
                </div>

                {/* Middle */}
                {location.pathname !== "/" && <ParksDropdown />}

                {/* Right */}
                {/* <div className="side right">
                        <Link to='/about' >
                            <button>
                                About
                            </button>
                        </Link>
                    </div> */}
            </div>
        </nav>
    );
};
