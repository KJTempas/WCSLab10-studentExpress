let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

//the first route - get students, return as JSON
    router.get('/students', function(req, res, next){
        Student.findAll().then( students => {
            return res.json(students)
        })
    })
//the second route - post a new student; return 201 status and OK message if works
    router.post('/students', function(req, res, next){
        Student.create(req.body).then( (data) =>{
            return res.status(201).send('ok')
        })
    })
    

    module.exports = router