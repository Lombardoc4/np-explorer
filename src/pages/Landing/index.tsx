import { ParksDropdown } from "../../components/Dropdown/ParksDropdown";
import { USMap } from "../../components/USMap";
import { Description } from "./DescriptionFeature";

export const LandingPage = () => {
    return (
        <>
            {/* Section 1 - Header */}
            <Header />

            {/* Section 2 - Description */}
            <Description />

            {/* Section 3 - Selection Map */}
            <USMap />
        </>
    );
};

const bgUrl = "/Grand_Teton_Landing_BG.jpg";
const Header = () => (
    <header className='min-h-dvh grid items-center'>
        <div className='container max-w-5xl px-4 md:mx-auto'>
            <h1 className='hidden'>Explore Your Favorite National Park</h1>
            <p className='text-3xl md:text-6xl font-black uppercase'>Explore Your</p>
            <div className={`bg-[url(${bgUrl})] bg-center bg-cover h-[300px] md:h-[500px] border-2 rounded-xl overflow-hidden`}>
                <div className='relative w-full px-4 xl:px-0 h-full bg-black/25 text-white flex items-center justify-center'>
                    <ParksDropdown />
                </div>
            </div>
            <p className='text-3xl md:text-6xl font-black uppercase text-right'>Favorite National Parks</p>
        </div>
    </header>
);
