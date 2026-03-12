import { Box, Button, Card, CardContent, Chip, Typography, CardActions } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";

type Props = {
    activity: Activity;
    onSelectActivity: (id: string) => void;
}

export default function ActivityCard({ activity, onSelectActivity }: Props) {
    const {deleteActivity} = useActivities();

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {activity.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                    {activity.date}
                </Typography>
                <Typography variant="body2">
                    {activity.description}
                </Typography>
                <Typography variant="subtitle1">
                    {activity.city} / {activity.venue}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box display='flex' gap={3}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="medium" 
                        loading={deleteActivity.isPending}
                        onClick={() => deleteActivity.mutate(activity.id)}>Delete</Button>
                    <Button variant="contained" size="medium" onClick={() => onSelectActivity(activity.id)}>View</Button>
                </Box>
            </CardActions>
        </Card>
    )
}