const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    descricao:{
        type:String,
        required:true
    },
    dataInicio:{
        type:Date,
        required:true
    },
    dataFim:{
        type:Date,
        required:true
    },
    usuario:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('eventData', eventSchema)