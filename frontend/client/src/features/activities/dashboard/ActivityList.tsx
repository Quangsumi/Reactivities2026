import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
    activities: Activity[];
    onSelectActivity: (id: string) => void;
}

export default function ActivityList({ activities, onSelectActivity }: Props) {
    return (
        <Box display='flex' flexDirection='column' gap={3}>
            {activities.map(activity => (
                <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onSelectActivity={onSelectActivity} />
            ))}
        </Box>
    )
}