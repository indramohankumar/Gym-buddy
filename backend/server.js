const express = require('express');
const cors = require('cors');
const dotenv =require('dotenv')
const mongoose = require('mongoose')
//routes
const workoutroutes = require('./routes/workout')
const userroutes = require('./routes/user')
dotenv.config()

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

// Create Express app
const app = express()
//middleware
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path,req.method)
    next() 

})
//routes
app.get('/',(req,res)=>{
    res.send('Backend is running');
})
app.use('/api/workouts',workoutroutes)
app.use('/api/user',userroutes)

if (!mongoUri) {
    console.error('Startup failed: MONGO_URI is missing in backend/.env');
    process.exit(1);
}



// Connect to DB first, then start server.
mongoose.connect(mongoUri)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port} and connected to MongoDB`);
        });
    })
    .catch((error) => {
        if (error?.code === 'ECONNREFUSED' && error?.syscall === 'querySrv') {
            console.error('MongoDB DNS lookup failed for your Atlas SRV host.');
            console.error('Check internet/DNS settings, VPN/proxy/firewall, and Atlas Network Access IP rules.');
        }

        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    })
