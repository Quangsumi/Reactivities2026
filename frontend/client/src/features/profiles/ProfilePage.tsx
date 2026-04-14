import { Grid } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import { useProfile } from "../../libs/hooks/useProfile";
import { useParams } from "react-router";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
    const {id} = useParams();
    const {profile} = useProfile(id);

    return (
        <Grid container>
            <Grid size={12}>
                <ProfileHeader profile={profile}/>
                <ProfileContent />
            </Grid>
        </Grid>
    )
}