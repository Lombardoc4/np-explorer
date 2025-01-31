import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter,  Route,  RouterProvider, Routes } from "react-router";

import App from "./Layout";
import ErrorPage from "./pages/Error";
import { LandingPage } from "./pages/Landing";
// import "./styles/weather-icons-wind.min.css";
// import "./styles/weather-icons.min.css";
import "./index.css";
import { parkRoutes } from "./routes/park";
import { stateRoutes } from "./routes/state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

const router = (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route
                    element={<App />}
                    errorElement={
                        <App>
                            <ErrorPage />
                        </App>
                    }
                >
                    <Route index element={<LandingPage />} errorElement={<ErrorPage />} />
                    {parkRoutes}
                    {stateRoutes}
                </Route>
            </Routes>
        </QueryClientProvider>
    </BrowserRouter>
);


// const router = createBrowserRouter([
//     // todo: re-renders all of layout for each object below, only need navbar re-rendered
//     // note : each child rerenders the layout ?
//     {
//         path: "/",
//         element: <App />,
//         errorElement: (
//             <App>
//                 <ErrorPage />
//             </App>
//         ),
//         children: [
//             {
//                 errorElement: <ErrorPage />,
//                 children: [
//                     {
//                         index: true,
//                         element: <LandingPage />,
//                     },
//                     ...parkRoutes,
//                     ...stateRoutes
//                 ],
//             },
//         ],
//     },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {router}
    </React.StrictMode>
);
