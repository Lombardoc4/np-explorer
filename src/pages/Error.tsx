import { Link } from "react-router";
import App from "../Layout";
import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { House } from "lucide-react";

export default function ErrorPage({error}: {error: Error | string}) {
    // const error: any = useRouteError();
    const errorMsg = typeof error === 'string' ? error : error.message || "Unknown Error";

    return (
        <App>
            <div className='container min-h-svh flex items-center justify-center mx-auto'>
                <div className="relative min-w-sm">
                    <div className='w-full flex justify-between items-end gap-4 border-b pb-4 mb-4'>
                        <h1 className='text-4xl font-light'>{errorMsg}</h1>
                        <Link to='/'>
                            <House size={48} absoluteStrokeWidth />
                        </Link>
                    </div>

                    <ParksDropdown />
                </div>
            </div>
        </App>
    );
}
