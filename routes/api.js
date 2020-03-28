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
    //this route for modifying a student
    router.patch('/students/:id', function(req, res, next) {
        Student.update( req.body, { where: { id: req.params.id} })
            .then( rowsModified =>  {
                return res.send('ok')
                
            })
    })
  //this route for deleting a student  
    router.delete('/students/:id', function(req, res, next){
        Student.destroy({where: {id: req.params.id}})
            .then( rowsModified => {
                return res.send('ok')
            })
    })

    module.exports = router