import { useProfile } from "../../libs/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import ProfileEdit from "./ProfileEdit";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h5">About {profile?.displayName}</Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel" : "Edit profile"}
                    </Button>
                )} 
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
                {editMode ? <ProfileEdit setEditMode={setEditMode}/> : profile?.bio || 'No description added yet'}
            </Box>
        </Box>
    )
}