const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//var capstoneProjects = [];
const mongoose = require('mongoose');
//specify where to find the schema
const Project = require('./models/project')

//connect and display the status 
//mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2
mongoose.connect('mongodb://127.0.0.1:27017/capstone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });


//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the students API 
//by adding /capstone, we tell the server that this method will be called every time http://localhost:8000/capstone is requested. 
app.get('/capstone', (req, res, next) => {

    //res.json(capstoneProjects);

    //call mongoose method find (MongoDB db.Students.find())
    Project.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});


//serve incoming post requests to /capstone
app.post('/capstone', (req, res, next) => {

    const projectObj = req.body;
    //const projectObj = JSON.parse(capstone);
    console.log(projectObj);

    // capstoneProjects.push(projectObj);

    // create a new project variable and save request’s fields 
    const project = new Project({
        contactName: projectObj.contactName,
        jobTitle: projectObj.jobTitle,
        contactEmail: projectObj.contactEmail,
        contactPhone: projectObj.contactPhone,
        address: {
            street: projectObj.address.street,
            city: projectObj.address.city,
            state: projectObj.address.state,
            zip: projectObj.address.zip,
        },
        projectTitle: projectObj.projectTitle,
        projectDescription: projectObj.projectDescription,
        technicalSkill: projectObj.technicalSkill
    });

    //send the document to the database 
    project.save()
        //in case of success
        .then(() => {
            console.log('Success');
            //sent an acknowledgment back to caller 
            res.status(201).json('Post successful');
        })
        //if error
        .catch(err => {
            console.log('Error:' + err);
            res.status(500).json(err);
        });

});

// //serve incoming post requests to /capstone
// app.put("/capstone/:id", (req, res, next) => {

//     console.log("app.put(/capstone/id " + req.params.id);

//     const projectObj = req.body;
//     //const projectObj = JSON.parse(capstone);
//     console.log(projectObj);

//     // capstoneProjects.push(projectObj);

//     // create a new project variable and save request’s fields 
//     const project = new Project({
//         contactName: projectObj.contactName,
//         jobTitle: projectObj.jobTitle,
//         contactEmail: projectObj.contactEmail,
//         contactPhone: projectObj.contactPhone,
//         address: {
//             street: projectObj.address.street,
//             city: projectObj.address.city,
//             state: projectObj.address.state,
//             zip: projectObj.address.zip,
//         },
//         projectTitle: projectObj.projectTitle,
//         projectDescription: projectObj.projectDescription,
//         technicalSkill: projectObj.technicalSkill
//     });

//     //send the document to the database 
//     project.save()
//         //in case of success
//         .then(() => {
//             console.log('Success');
//             //sent an acknowledgment back to caller 
//             res.status(201).json('Post successful');
//         })
//         //if error
//         .catch(err => {
//             console.log('Error:' + err);
//             res.status(500).json(err);
//         });

// });


app.put('/capstone/:id', async (req, res) => {
    const { id } = req.params;
    //const { firstName, lastName } = req.body;
    const projectObj = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            projectObj,
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);

    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: 'Error updating Project' });
    }
});



//:id is a dynamic parameter that will be extracted from the URL
app.delete("/capstone/:id", (req, res, next) => {

    console.log("app.delete(/capstone/id " + req.params.id);

    Project.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});


//to use this middleware in other parts of the application
module.exports = app;