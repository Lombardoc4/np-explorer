import { stateMap, borderMap, otherMap } from '../../data/stateMap';
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from '../Dropdown';
import './stateMap.css'


export const USMap = () => {
    const navigate = useNavigate();
    
    const handleStateSelect = (state:any) => {
        window.scrollTo(0, 0);
        navigate('/state/' + state);
    }
    
    return (
        <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3em 0', gap: '2em'}}>
            <svg className='us-map' xmlns="http://www.w3.org/2000/svg" width="959" height="593">
                <g className="state">
                {stateMap.map((state) => (
                    <Link key={state.id} to={'state/' + state.id}>
                    <path  className={state.id} d={state.data} />
                    </Link>
                ))}
                </g>
                <g className="borders">
                {borderMap.map((state) => (
                    <path key={state.id} className={state.id} d={state.data} />
                ))}
                </g>
                {otherMap.map((state) => (
                    <path key={state.id} className={state.id} d={state.data} />
                ))}
            </svg>
            
            <Dropdown
                placeholder='Search for a state'
                // options={allParks.map((park) => ({value: park.id, title: park.fullName}))}
                options={stateMap.map((state) => ({value: state.id, title: state.name}))}
                onSelect={(option) => handleStateSelect(option)}
            />
        </div>
    )
}