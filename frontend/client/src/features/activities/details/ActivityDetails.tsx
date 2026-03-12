import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";
import { Link, useParams } from "react-router";

export default function ActivityDetails() {
    const {id} = useParams();
    const {activity} = useActivities(id);

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
                <Button color="primary" component={Link} to={`/activities/edit/${activity.id}`}>
                    Edit
                </Button>
                <Button color='inherit' component={Link} to='/activities'>
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}