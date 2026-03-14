import { createBrowserRouter } from "react-router";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import Counter from "../../features/counter/Counter";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestError from "../../features/errors/TestError";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailPage /> },
            { path: 'activities/create', element: <ActivityForm key="createForm"/> },
            { path: 'activities/:id/edit', element: <ActivityForm /> },
            { path: 'counter', element: <Counter /> },
            { path: 'errors', element: <TestError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <NotFound /> },
        ]
    },
]);