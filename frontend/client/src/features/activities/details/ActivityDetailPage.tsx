import { Typography, Grid } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";
import { useParams } from "react-router";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

export default function ActivityDetailPage() {
    const {id} = useParams();
    const {activity} = useActivities(id);

    if(!activity) return (<Typography>Loading...</Typography>)

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailHeader activity={activity} />
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailSidebar activity={activity}/>
            </Grid>
        </Grid>
    )
}