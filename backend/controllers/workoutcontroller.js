const workout=require('../models/workoutmodel')
const mongoose=require('mongoose')
// get all workouts
exports.getworkouts = async (req, res) => {
    const user_id = req.user._id;
    try {
        const workouts = await workout.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}






// get a single workout
exports.getworkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const singleWorkout = await workout.findById(id)

    if (!singleWorkout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(singleWorkout)
}




//create a new workout
 exports.createworkout=async(req, res)=>{
    const{title,load,reps}=req.body;

    // Check for empty fields
    let emptyFields = [];
    if (!title) emptyFields.push('title');
    if (!load && load !== 0) emptyFields.push('load');
    if (!reps) emptyFields.push('reps');

    if (emptyFields.length > 0) {
        return res.status(400).json({ 
            error: 'Please fill in all the fields', 
            emptyFields 
        });
    }

    try{
        const user_id = req.user._id;
        const newWorkout = await workout.create({ title, load, reps, user_id })
        return res.status(200).json(newWorkout)
    }
    catch(error){
        // Parse Mongoose validation errors into field-level messages
        if (error.name === 'ValidationError') {
            const fieldErrors = {};
            const emptyFields = [];
            for (const field in error.errors) {
                fieldErrors[field] = error.errors[field].message;
                emptyFields.push(field);
            }
            return res.status(400).json({ 
                error: 'Validation failed', 
                fieldErrors, 
                emptyFields 
            });
        }
        return res.status(400).json({ error: error.message })
    }
}

//delete a workout by its id 
exports.deleteworkout=async(req, res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"no such workouts"})
    }
    const deletedWorkout = await workout.findOneAndDelete({_id:id})
    if(!deletedWorkout){
        return res.status(400).json({error:"no such message to delete "})
    }
    res.status(200).json(deletedWorkout)
}




//update a workout by its id
exports.updateworkout=async(req, res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"no such workouts"})
    }
    const updatedWorkout = await workout.findOneAndUpdate({_id:id},{
        ...req.body
    },
    {new:true}
    
)
    if(!updatedWorkout){
        return res.status(400).json({error:"no such message to update "})
    }
    res.status(200).json(updatedWorkout)
}
