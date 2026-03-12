import { Card, CardContent, Typography, CardActions, Chip, Box, Button } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";
import {Link, useNavigate} from "react-router";

type Props = {
    activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
    const {deleteActivity} = useActivities();
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        await deleteActivity.mutateAsync(id);
        navigate('/activities');
    }

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
                        onClick={() => handleDelete(activity.id)}>Delete</Button>
                    <Button 
                        variant="contained" 
                        size="medium" 
                        component={Link}
                        to={`/activities/${activity.id}`}>View</Button>
                </Box>
            </CardActions>
        </Card>
    )
}