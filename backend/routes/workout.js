const express =require('express');
const { createworkout, getworkouts, getworkout, deleteworkout, updateworkout } = require('../controllers/workoutcontroller');
const router =express.Router()
//route:/api/workout
//method get 
//descripation get all methods 
//access public 
//parametrs id
// GET all workouts
router.get('/', getworkouts)

// GET a single workout
router.get('/:id', getworkout)

// POST a new workout
router.post('/', createworkout)
//route:/api/workout/:id
//method delete
//descripation delete the method by its id  
//access public 
//parametrs id
router.delete('/:id',deleteworkout)
//route:/api/workout/:id
//method patch
//descripation update the method by its id  
//access public 
//parametrs id
router.patch('/:id',updateworkout)
module.exports=router