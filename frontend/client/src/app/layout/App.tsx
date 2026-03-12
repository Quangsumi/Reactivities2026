import { useState } from 'react';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import useActivities from '../../libs/hooks/useActivities';

export default function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string): void => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = (): void => {
    setSelectedActivity(undefined);
  }
  
  const handleOpenActivityForm = (id?: string): void => {
    if(id) handleSelectActivity(id)
      else handleCancelSelectActivity()
    setEditMode(true);
  }

  const handleCloseActivityForm = (): void => {
    setEditMode(false);
  }

  return (
    <Box sx={{ backgroundColor: '#eeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar onOpenActivityForm={handleOpenActivityForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        { !activities || isPending ? <Typography>Loading...</Typography> : 
          <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity}
            onSelectActivity={handleSelectActivity}
            onCancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            onCancelActivityForm={handleCloseActivityForm}
            onOpenActivityForm={handleOpenActivityForm}
          />
        }
      </Container>
    </Box>   
  )
}