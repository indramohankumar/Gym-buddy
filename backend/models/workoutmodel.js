const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Exercise title is required'],
            trim: true,
        },
        reps: {
            type: Number,
            required: [true, 'Number of reps is required'],
            min: [1, 'Reps must be at least 1'],
        },
        load: {
            type: Number,
            required: [true, 'Load (in kg) is required'],
            min: [0, 'Load cannot be negative'],
        },
        user_id: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Workout', workoutSchema);



