import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../libs/hooks/useAccount"
import { Typography } from "@mui/material";

export default function RequiredAuth() {
    const {currentUser, loadingUserInfo} = useAccount();
    const location = useLocation();

    if (loadingUserInfo) return <Typography>Loading...</Typography>

    if(!currentUser) return <Navigate to='/login' state={{from: location}} />

    return (
        <Outlet />
    )
}