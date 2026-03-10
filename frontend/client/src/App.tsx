import { useState, useEffect } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
    const getActivities = async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/Activities');
      setActivities(response.data);
    }
    getActivities();
  }, [])

  return (
    <>
      <Typography variant="h4">Reactivities</Typography>
      <List>
        {activities.map(activity => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </>
  )
}

export default App
