const express = require('express')
const router = express.Router()
const userSchemaCopy = require('../models/modeloUser')
const eventSchemaCopy = require('../models/modeloEvento')

router.post('/createNewUser', (request, response) => {
    const newUser = new userSchemaCopy({
        username:request.body.username,
        password:request.body.password
    })
    newUser.save()
    .then(() => {
        response.status(201).send("1")
    })
    .catch(() => {
        response.send("0")
    })
})

router.get('/loginUser/:username/:password', (request, response) => {
    userSchemaCopy.countDocuments({username: request.params.username, password:request.params.password}, function (err, count){ 
        if(!err){
            if(count>0){
                response.status(200).json({existe:"1", username:request.params.username})
            }
            else
            {
                response.json({existe:"0", username:request.params.username})
            }
        }
        else
        {
            console.log(err)
        }
    }); 
})

router.post('/createNewEvent', (request, response) => {
    //checar colisao
    eventSchemaCopy.find({usuario: request.body.usuario}, function (err, allEventUser){
        var flagHorarioEvento=true;
        var errorMsg=""
        var errorEvent

        for(var i=0; i<allEventUser.length; i++)
        {
            if((new Date(request.body.dataInicio) > allEventUser[i].dataInicio) && (new Date(request.body.dataInicio) < allEventUser[i].dataFim))
            {
                errorMsg="Erro 1: O horário de início escolhido já possui outro intervalo de evento agendado."
                errorEvent=allEventUser[i]
                flagHorarioEvento=false;
                i=allEventUser.length;
            }
            else {
                if((new Date(request.body.dataInicio) < allEventUser[i].dataInicio) && (new Date(request.body.dataFim) > allEventUser[i].dataInicio))
                {
                    errorMsg="Erro 2: O horário de fim escolhido já possui outro intervalo de evento agendado."
                    errorEvent=allEventUser[i]
                    flagHorarioEvento=false;
                    i=allEventUser.length;
                }
                else
                {
                    if((new Date(request.body.dataInicio) - allEventUser[i].dataInicio==0))
                    {
                        errorMsg="Erro 3: O horário de início não pode ser o mesmo horário de início de outro evento agendado."
                        errorEvent=allEventUser[i]
                        flagHorarioEvento=false;
                        i=allEventUser.length;
                    }
                    else
                    {
                        if((new Date(request.body.dataFim) - allEventUser[i].dataFim==0))
                        {
                            errorMsg="Erro 4: O horário de término não pode ser o mesmo horário de términio de outro evento agendado."
                            errorEvent=allEventUser[i]
                            flagHorarioEvento=false;
                            i=allEventUser.length;
                        }
                    }
                }
            }
        }

        if(flagHorarioEvento)
        {
            const newEvent = new eventSchemaCopy({
                descricao:request.body.descricao,
                dataInicio:request.body.dataInicio,
                dataFim:request.body.dataFim,
                usuario:request.body.usuario
            })
            newEvent.save()
                .then(() => {
                    response.status(201).send("1")
                })
                .catch(() => {
                    response.send("0")
                })
        }
        else
        {
            response.json({errorMsg, errorEvent})
        }
    }); 
})

router.get('/getEventList/:userId', (request, response) => {
    eventSchemaCopy.find({usuario: request.params.userId}).sort({dataInicio: 'asc'}).exec(function(err, allEventUser) { 
        if (!err) {
            response.status(200).send(allEventUser)
            }
        else {
            response.send("0")
            console.log(err)
        }
     });
})

router.get('/getEvent/:eventId', (request, response) => {
    eventSchemaCopy.findOne({_id: request.params.eventId}).exec(function(err, element) { 
        if (!err) {
            response.status(200).send(element)
            }
        else {
            response.send("0")
            console.log(err)
        }
     });
})

router.delete('/deleteEvent/:eventId', (request, response) => {
    eventSchemaCopy.findOneAndDelete({_id:request.params.eventId}, function (err){ 
        if (!err) {
            response.status(200).send("1")
            }
        else {
            response.send("0")
        }
    });
})

router.put('/updateEvent/:eventId', (request, response) => {
    //checar colisao
    eventSchemaCopy.find({usuario: request.body.usuario, _id:{ $nin: request.params.eventId }}, function (err, allEventUser){
        var flagHorarioEvento=true;
        var errorMsg=""
        var errorEvent

        for(var i=0; i<allEventUser.length; i++)
        {
            if((new Date(request.body.dataInicio) > allEventUser[i].dataInicio) && (new Date(request.body.dataInicio) < allEventUser[i].dataFim))
            {
                errorMsg="Erro 1: O horário de início escolhido já possui outro intervalo de evento agendado."
                errorEvent=allEventUser[i]
                flagHorarioEvento=false;
                i=allEventUser.length;
            }
            else {
                if((new Date(request.body.dataInicio) < allEventUser[i].dataInicio) && (new Date(request.body.dataFim) > allEventUser[i].dataInicio))
                {
                    errorMsg="Erro 2: O horário de fim escolhido já possui outro intervalo de evento agendado."
                    errorEvent=allEventUser[i]
                    flagHorarioEvento=false;
                    i=allEventUser.length;
                }
                else
                {
                    if((new Date(request.body.dataInicio) - allEventUser[i].dataInicio==0))
                    {
                        errorMsg="Erro 3: O horário de início não pode ser o mesmo horário de início de outro evento agendado."
                        errorEvent=allEventUser[i]
                        flagHorarioEvento=false;
                        i=allEventUser.length;
                    }
                    else
                    {
                        if((new Date(request.body.dataFim) - allEventUser[i].dataFim==0))
                        {
                            errorMsg="Erro 4: O horário de término não pode ser o mesmo horário de términio de outro evento agendado."
                            errorEvent=allEventUser[i]
                            flagHorarioEvento=false;
                            i=allEventUser.length;
                        }
                    }
                }
            }
        }

        if(flagHorarioEvento)
        {
            eventSchemaCopy.findOneAndUpdate({_id:request.params.eventId}, 
                {descricao:request.body.descricao, dataInicio:(new Date(request.body.dataInicio)), dataFim:(new Date(request.body.dataFim))}, 
                function(errUpdate){
                    if(!errUpdate){
                        response.status(200).send("1")
                    }
                    else
                    {
                        response.send("0")
                        console.log(errUpdate)
                    }
                })
        }
        else
        {
            response.json({errorMsg, errorEvent})
        }
    }); 
})

module.exports = router