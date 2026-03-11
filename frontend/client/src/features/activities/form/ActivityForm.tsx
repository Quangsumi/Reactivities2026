import { Paper, Typography, Box, TextField, Button } from "@mui/material";

type Props = {
    activity?: Activity
    onCancelActivityForm: () => void
    submitForm: (activity: Activity) => void
}

export default function ActivityForm ({ activity, onCancelActivityForm, submitForm }: Props) {

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // If we're editing an existing activity, include its ID in the data
        if (activity) data.id = activity.id;

        submitForm(data as unknown as Activity);
    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create activity
            </Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3} onSubmit={handleSubmit}>
                <TextField name='title' label='Title' defaultValue={activity?.title || ''} />
                <TextField name='description' label='Description' defaultValue={activity?.description || ''} multiline rows={3} />
                <TextField name='category' defaultValue={activity?.category || ''} label='Category' />
                <TextField name='date' defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : ''} label='Date' type="date" />
                <TextField name='city' defaultValue={activity?.city || ''} label='City' />
                <TextField name='venue' defaultValue={activity?.venue || ''} label='Venue' />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color='inherit' onClick={onCancelActivityForm}>Cancel</Button>
                    <Button type="submit" color='success' variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}