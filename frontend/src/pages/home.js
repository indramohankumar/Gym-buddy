import React, { useEffect, useState } from 'react'

//components
import WorkoutDetails from '../components/workoutdetails';
import WorkoutForm from '../components/workoutfrom';
import { useWorkoutsContext } from '../components/useworkoutscontext';


function Home() {
  //use state
  //const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const response = await fetch(`${apiUrl}/api/workouts`);
        const json = await response.json();
        
        if (response.ok) {
         // setWorkouts(json);
         // setError(null);
         dispatch({ type: 'SET_WORKOUTS', payload: json });
         setError(null);
         console.log('workouts fetched successfully', json);
         
        } else {
          setError(json.error || 'Failed to fetch workouts. Server returned an error.');
        }
      } catch (err) {
        setError('Could not connect to the server. Please ensure the backend is running.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchWorkouts();
  }, [dispatch])
  

  return (
    <div className='home'>
      <div className='workouts'>
        {isLoading && <p>Loading workouts...</p>}
        {error && <p className='error'>{error}</p>}
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
