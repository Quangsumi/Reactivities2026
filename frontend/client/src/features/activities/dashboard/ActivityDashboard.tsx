import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    onSelectActivity: (id: string) => void;
    onCancelSelectActivity: () => void;
    editMode: boolean;
    onCancelActivityForm: () => void;
    onOpenActivityForm: (id?: string) => void;
    submitForm: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, onSelectActivity, onCancelSelectActivity, 
    editMode, onCancelActivityForm, onOpenActivityForm, submitForm, deleteActivity }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList activities={activities} onSelectActivity={onSelectActivity} deleteActivity={deleteActivity} />
            </Grid>
            <Grid size={5}>
                { selectedActivity && !editMode 
                    && <ActivityDetails activity={selectedActivity} 
                        onCancelSelectActivity={onCancelSelectActivity} 
                        onEditActivity={onOpenActivityForm} /> }

                { editMode && <ActivityForm activity={selectedActivity} onCancelActivityForm={onCancelActivityForm} submitForm={submitForm} /> }
            </Grid>
        </Grid>
    )
}