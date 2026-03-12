import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";

type Props = {
    selectedActivity: Activity;
    onCancelSelectActivity: () => void;
    onEditActivity: (id?: string) => void;
}

export default function ActivityDetails( { selectedActivity, onCancelSelectActivity, onEditActivity }: Props) {
    const {activities} = useActivities();
    const activity = activities?.filter(a => a.id === selectedActivity.id)[0];

    if(!activity) return (<Typography>Loading...</Typography>)

    return (
        <Card>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
             <CardActions>
                <Button color="primary" onClick={() => onEditActivity(activity.id)}>
                    Edit
                </Button>
                <Button color='inherit' onClick={onCancelSelectActivity}>
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}