import React from 'react'
import { useWorkoutsContext } from './useworkoutscontext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({workout}) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return
    }

    const apiUrl = process.env.REACT_APP_API_URL || '';
    const response = await fetch(`${apiUrl}/api/workouts/` + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
   }

  return (
    <div className='workout-details'>
      <div className='workout-card-header'>
        <span className='workout-emoji'>🏋️</span>
        <h4>{workout.title}</h4>
      </div>
      <div className='workout-card-stats'>
        <div className='stat-badge'>
          <span className='stat-label'>Load</span>
          <span className='stat-value'>{workout.load} kg</span>
        </div>
        <div className='stat-badge'>
          <span className='stat-label'>Reps</span>
          <span className='stat-value'>{workout.reps}</span>
        </div>
      </div>
      <p className='workout-date'>{formatDate(workout.createdAt)}</p>
      <button type='button' className='delete-btn' onClick={handleClick}>
        🗑️ Delete
      </button>
    </div>
  )
}

export default WorkoutDetails
