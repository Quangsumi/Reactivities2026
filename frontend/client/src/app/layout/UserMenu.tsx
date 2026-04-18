import { useAccount } from '../../libs/hooks/useAccount';
import { useState } from "react";
import { Avatar, Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Add, Logout, Password, Person } from "@mui/icons-material";
import { Link } from "react-router";

export default function UserMenu() {
    const { currentUser, logoutUser } = useAccount();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color='inherit'
                size="large"
                sx={{ fontSize: '1.1rem' }}
            >
                <Box display='flex' alignItems='center' gap={2} >
                    <Avatar src={currentUser?.imageUrl} alt='Image of host' /> {currentUser?.displayName}
                </Box>

            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button'
                    }
                }}
            >
                <MenuItem component={Link} to='/activities/create' onClick={() => setAnchorEl(null)}>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText>Create activity</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to={`/profiles/${currentUser?.id}`} onClick={() => setAnchorEl(null)}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>
                 <MenuItem component={Link} to={'/change-password'} onClick={() => setAnchorEl(null)}>
                    <ListItemIcon><Password /></ListItemIcon>
                    <ListItemText>Change password</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    logoutUser.mutate();
                    setAnchorEl(null);
                }}>
                    <ListItemIcon><Logout /></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}