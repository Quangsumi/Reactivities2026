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
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequiredAuth from "./RequiredAuth";
import ProfilePage from "../../features/profiles/ProfilePage";
import VerifyEmail from "../../features/account/VerifyEmail";
import ForgotPasswordForm from "../../features/account/ForgotPasswordForm";
import ResetPasswordForm from "../../features/account/ResetPasswordForm";
import ChangePasswordForm from "../../features/account/ChangePasswordForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            {
                element: <RequiredAuth />,
                 children: [
                     { path: 'activities', element: <ActivityDashboard /> },
                     { path: 'activities/:id', element: <ActivityDetailPage /> },
                     { path: 'activities/create', element: <ActivityForm key="createForm"/> },
                     { path: 'activities/:id/edit', element: <ActivityForm /> },
                     { path: 'profiles/:id', element: <ProfilePage /> },
                     { path: 'change-password', element: <ChangePasswordForm /> },
                ]
            },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'confirm-email', element: <VerifyEmail /> },
            { path: 'forgot-password', element: <ForgotPasswordForm /> },
            { path: 'reset-password', element: <ResetPasswordForm /> },

            { path: 'counter', element: <Counter /> },
            { path: 'errors', element: <TestError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <NotFound /> },
        ]
    },
]);