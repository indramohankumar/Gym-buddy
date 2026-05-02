import React, { useState } from 'react'
import { useWorkoutsContext } from './useworkoutscontext';
import { useAuthContext } from '../hooks/useAuthContext';

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps };
        try {
            const apiUrl = process.env.REACT_APP_API_URL || '';
            const response = await fetch(`${apiUrl}/api/workouts`, {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            const json = await response.json();
            if (!response.ok) {
                setError(json.error || 'Failed to add workout');
                setEmptyFields(json.emptyFields || []);
            } else {
                setError(null);
                setEmptyFields([]);
                setTitle('');
                setLoad('');
                setReps('');
                console.log('new workout added', json);
                dispatch({ type: 'CREATE_WORKOUT', payload: json });
            }
        } catch (err) {
            setError('Could not connect to server');
            setEmptyFields([]);
        }
    }

    return (
        <div className='form-container'>
            <form className='create' onSubmit={handleSubmit}>
                <h3>➕ Add New Workout</h3>
                <p className='form-subtitle'>Log your exercise to track progress</p>

                <div className='form-group'>
                    <label>Exercise Title</label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='e.g. Bench Press, Squats...'
                        className={emptyFields.includes('title') ? 'error' : ''}
                    />
                </div>

                <div className='form-group'>
                    <label>Load (kg)</label>
                    <input
                        type='number'
                        onChange={(e) => setLoad(e.target.value)}
                        value={load}
                        placeholder='e.g. 50'
                        className={emptyFields.includes('load') ? 'error' : ''}
                    />
                </div>

                <div className='form-group'>
                    <label>Reps</label>
                    <input
                        type='number'
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                        placeholder='e.g. 12'
                        className={emptyFields.includes('reps') ? 'error' : ''}
                    />
                </div>

                <button>💪 Add Workout</button>
                {error && <div className='error-message'>⚠️ {error}</div>}
            </form>
        </div>
    )
}

export default WorkoutForm
