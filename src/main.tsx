import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./Layout";
import ErrorPage from "./pages/Error";
import { LandingPage } from "./pages/Landing";
import "./index.css";
import { parkRoutes } from "./routes/park";
import { stateRoutes } from "./routes/state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<App />}>
                        <Route index element={<LandingPage />} />
                        {parkRoutes}
                        {stateRoutes}
                    </Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
