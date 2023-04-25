import { stateMap, borderMap, otherMap } from '../../data/stateMap';
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from '../Dropdown';
// import './stateMap.css'

import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em 0;
    /* gap: 2em; */
`;

const USMapSVG = styled.svg`
    path {fill: none; cursor: pointer}
    .borders {stroke:#FFFFFF; stroke-width:1}    /* color and width of borders between states */
`;

const StatePaths = styled.g`
    path {
        fill: #507743;
        &:hover {
            fill: #6a9e3f;
        }
    }
`;

export const USMap = () => {
    const navigate = useNavigate();
    const [hoverState, setHoverState] = useState('');
    
    const handleStateSelect = (state:any) => {
        window.scrollTo(0, 0);
        navigate('/state/' + state);
    }
    
    return (
        <Container className="container">
            <h2>Where To Explore?</h2>
            <div style={{margin: '1em 0', width: '100%'}}>
                <Dropdown
                    placeholder='Search for a state'
                    // options={allParks.map((park) => ({value: park.id, title: park.fullName}))}
                    options={stateMap.map((state) => ({value: state.id, title: state.name}))}
                    onSelect={(option) => handleStateSelect(option)}
                    />
            </div>
            <div>
                <h3 style={{textAlign: 'center'}}>{hoverState}</h3>
                <USMapSVG xmlns="http://www.w3.org/2000/svg" width="959" height="593">
                    <StatePaths>
                        {stateMap.map((state) => (
                            <Link key={state.id} to={'state/' + state.id}>
                                <path onMouseEnter={() => setHoverState(state.name)} className={state.id} d={state.data} />
                            </Link>
                        ))}
                    </StatePaths>
                    <g className="borders">
                        {borderMap.map((state) => (
                            <path key={state.id} className={state.id} d={state.data} />
                        ))}
                    </g>
                        {otherMap.map((state) => (
                            <path key={state.id} className={state.id} d={state.data} />
                        ))}
                </USMapSVG>
            </div>
            
            
        </Container>
    )
}