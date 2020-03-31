let express = require('express')
let Sequelize = require('sequelize')  //require Sequelize so you can check for error types
let db = require('../models')
let Student = db.Student

let router = express.Router()

//the first route - get students, return as JSON
    router.get('/students', function(req, res, next){
        Student.findAll( {order: ['name']} ).then( students => {
            return res.json(students)
            //catch errors
        }).catch( err=> next(err))
    })
//the second route - post a new student; return 201 status and OK message if works
    router.post('/students', function(req, res, next){
        Student.create(req.body).then( (data) =>{
            return res.status(201).send('ok')
        }).catch( err => {
            if (err instanceof Sequelize.ValidationError) {
                let message = err.errors.map ( e => e.message)
                //400 = bad request from use; return message also
                return res.status(400).json(messages)
            }
            return next(err)
        })
    })
    //this route for modifying a student
    router.patch('/students/:id', function(req, res, next) {
        //match id 
        Student.update( req.body, { where: { id: req.params.id} })
            .then( rowsModified =>  {
                if (!rowsModified[0]) {
                    // 404 = not found, so student w/ this ID not found
                    return res.status(404).send('Not found')
                } else {
                    return res.send('ok')
                }
            }).catch(err => {
                if(err instanceof Sequelize.ValidationError) {
                    let messages = err.errors.map( (e) => e.message)
                    //400 code = bad request from user
                    return res.status(400).json(messages)
                }
                return next(err)
            })
    })
  //this route for deleting a student  
    router.delete('/students/:id', function(req, res, next){
        //have to match id
        Student.destroy({where: {id: req.params.id}})
            .then( rowsModified => {
                return res.send('ok')
            }).catch( err => next(err) )
    })

    module.exports = router