import { ParkSection } from "../components/section";

export const WeatherSection = ({ weather, children }: any) => {
    return (
        <ParkSection name='Weather'>
            <div>
                <p className='text-lg'>{weather}</p>
            </div>
            {children}
        </ParkSection>
    );
};
