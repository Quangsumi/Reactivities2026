import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

type Props = {
    activity: Activity;
    onCancelSelectActivity: () => void;
    onEditActivity: (id?: string) => void;
}

export default function ActivityDetails( { activity, onCancelSelectActivity, onEditActivity }: Props) {
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