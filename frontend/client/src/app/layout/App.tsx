import { useState, useEffect } from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getActivities = async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/Activities');
      setActivities(response.data);
    }
    getActivities();
  }, [])

  const handleSelectActivity = (id: string): void => {
    setSelectedActivity(activities.find(x => x.id === id));
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

  const handleSubmitForm = (activity: Activity): void => {
    if(activity.id) { // Edit existing activity
      setActivities(activities.map(a => a.id === activity.id ? activity : a));
      setSelectedActivity(activity);
    } else { // Create new activity
      const newActivity = { ...activity, id: Math.random().toString(36).substr(2, 9) };
      setActivities([...activities, newActivity]);
      setSelectedActivity(newActivity);
    }
    setEditMode(false); 
  }

  const handleDeleteActivity = (id: string): void => {
    setActivities(activities.filter(a => a.id !== id));
    if(selectedActivity?.id === id) handleCancelSelectActivity();
  }

  return (
    <Box sx={{ backgroundColor: '#eeee' }}>
      <CssBaseline />
      <NavBar onOpenActivityForm={handleOpenActivityForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          onCancelActivityForm={handleCloseActivityForm}
          onOpenActivityForm={handleOpenActivityForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>   
  )
}