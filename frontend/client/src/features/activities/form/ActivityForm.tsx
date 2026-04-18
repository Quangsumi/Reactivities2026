import { Paper, Typography, Box, Button } from "@mui/material";
import useActivities from "../../../libs/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { activitySchema, type ActivitySchema } from "../../../libs/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod'
import CustomizedTextField from "../../../app/shared/components/CustomizedTextField";
import CustomizedSelect from "../../../app/shared/components/CustomizedSelect";
import { catetoryOptions } from "./categoryOptions";
import CustomizedDateTimePicker from "../../../app/shared/components/CustomizedDateTimePicker";
import CustomizedLocationInput from "../../../app/shared/components/CustomizedLocationInput";
import { useEffect } from "react";

export default function ActivityForm () {
    const {control, handleSubmit, reset} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    })
    const navigate = useNavigate();
    const {id} = useParams();
    const {updateActivity, createActivity, activity} = useActivities(id);

    const isEditMode = id && activity;

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude
                }
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location };
        try {
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData } as Activity, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                });
            } else {
                createActivity.mutate(flattenedData as Activity, {
                    onSuccess: (response: Activity) => {
                        navigate(`/activities/${response.id}`);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (error: any) => {
        console.log(error);
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {isEditMode ? "Edit activity" : "Create activity"}
            </Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3} onSubmit={handleSubmit(onSubmit, onError)}>
                <CustomizedTextField label='Title' name='title' control={control} />
                <CustomizedTextField label='Description' name='description' control={control} multiline rows={3} />
                <Box display='flex' gap={3}>
                    <CustomizedSelect label='Category' name='category' items={catetoryOptions} control={control} />
                    <CustomizedDateTimePicker label='Date' name='date' control={control} />
                </Box>
                <CustomizedLocationInput label="Enter location here" name="location" control={control} />

                <Box display='flex' justifyContent='end' gap={3}>
                    <Button 
                        onClick={() => navigate(-1)}
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