import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";

export default function ActivityForm () {
    const navigate = useNavigate();
    const {id} = useParams();
    const {updateActivity, createActivity, activity} = useActivities(id);

    const isEditMode = id && activity;

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (isEditMode) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.id}`)
        } else {
            const newActivity = await createActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${newActivity.id}`)
        }
    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {isEditMode ? "Edit activity" : "Create activity"}
            </Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3} onSubmit={handleSubmit}>
                <TextField name='title' label='Title' defaultValue={activity?.title || ''} />
                <TextField name='description' label='Description' defaultValue={activity?.description || ''} multiline rows={3} />
                <TextField name='category' defaultValue={activity?.category || ''} label='Category' />
                <TextField name='date' defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : ''} label='Date' type="date" />
                <TextField name='city' defaultValue={activity?.city || ''} label='City' />
                <TextField name='venue' defaultValue={activity?.venue || ''} label='Venue' />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button 
                        color='inherit' 
                        component={Link} 
                        to={isEditMode ? `/activities/${activity.id}` : "/activities"}
                        >
                            Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        color='success' 
                        variant="contained"
                        loading={updateActivity.isPending || createActivity.isPending}
                        >
                            Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}