import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, LinearProgress } from "@mui/material";
import { NavLink } from "react-router";
import {Observer } from "mobx-react-lite";
import useStore from "../../libs/hooks/useStore";

export default function NavBar() {
    const {uiStore} = useStore();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', position: 'relative'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize='large' /> {/* an icon */}
                                <Typography variant="h4" fontWeight='bold'>Reactivities</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <MenuItem 
                                component={NavLink} 
                                to='/activities' 
                                end             // exact match only
                                classes={({ isActive }: {isActive: boolean}) => (isActive ? 'active' : '')}
                                sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit', '&.active': {color: 'yellow'}}}>
                                Activities
                            </MenuItem>
                            <MenuItem 
                                component={NavLink} to='/activities/create' 
                                classes={({ isActive }: {isActive: boolean}) => (isActive ? 'active' : '')}
                                sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit', '&.active': {color: 'yellow'} }}>
                                Create Activity
                            </MenuItem>
                            <MenuItem 
                                component={NavLink} to='/counter' 
                                classes={({ isActive }: {isActive: boolean}) => (isActive ? 'active' : '')}
                                sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit', '&.active': {color: 'yellow'} }}>
                                Counter
                            </MenuItem>
                            <MenuItem 
                                component={NavLink} to='/errors' 
                                classes={({ isActive }: {isActive: boolean}) => (isActive ? 'active' : '')}
                                sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit', '&.active': {color: 'yellow'} }}>
                                Errors
                            </MenuItem>
                        </Box>
                        <MenuItem>
                            User Menu
                        </MenuItem>
                    </Toolbar>
                </Container>
                <Observer>
                    {() =>
                        uiStore.isLoading ? (
                            <LinearProgress
                                color="secondary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 4, // Adjust height if needed
                                }}
                            />
                        ) : null
                    }
                </Observer>
            </AppBar>
        </Box>
    )
}