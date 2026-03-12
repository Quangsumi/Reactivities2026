import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import useActivities from "../../../libs/hooks/useActivities";

export default function ActivityList() {
    const {activities} = useActivities();
    
    if(!activities) return (<Typography>No activities</Typography>)

    return (
        <Box display='flex' flexDirection='column' gap={3}>
            {activities.map(activity => (
                <ActivityCard key={activity.id} activity={activity}/>
            ))}
        </Box>
    )
}