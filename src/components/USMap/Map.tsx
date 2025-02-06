import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { stateMap, borderMap, otherMap } from "../../utils/lib/stateMap";
import { StateDropdown } from "../Dropdown/StateDropdown";

export const Map = () => {
    const blankState = { name: "", id: "" };
    const [hoverState, setHoverState] = useState(blankState);
    const navigate = useNavigate();

    return (
        <>
            <div className='grid grid-cols-2 items-center mb-8 '>
                <div>
                    <h2 className='text-6xl uppercase font-semibold italic'>Where To?</h2>
                    <h3
                        className='text-4xl uppercase underline'
                        onClick={() => hoverState.name && navigate("/state/" + hoverState.id)}
                    >
                        {hoverState.name || "Pick a state"}
                    </h3>
                </div>

                <div className='w-full min-h-[50px] relative flex justify-center'>
                    <StateDropdown />
                </div>
            </div>

            <svg
                className='w-full max-w-[750px] mx-auto'
                onMouseLeave={() => setHoverState(blankState)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 959 593'
            >
                <g>
                    {stateMap.map((state) => (
                        <Link key={state.id} to={"/" + state.id}>
                            <path
                                className='fill-green-700 hover:fill-green-900'
                                onMouseEnter={() => setHoverState(state)}
                                onTouchStart={() => setHoverState(state)}
                                d={state.data}
                            />
                        </Link>
                    ))}
                </g>

                {/* Border */}
                <g className='borders'>
                    {borderMap.map((state) => (
                        <path
                            fill='none'
                            stroke={"#FFFFFF"}
                            strokeWidth={1}
                            key={state.id}
                            className={state.id}
                            d={state.data}
                        />
                    ))}
                </g>

                {otherMap.map((state) => (
                    <path className='cursor-pointer' fill='none' key={state.id} d={state.data} />
                ))}
            </svg>
        </>
    );
};
