const mongoose = require('mongoose')
const router = require('../routes/usuarios')

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        defualt: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }

})

module.exports = mongoose.model('Tarea', TareaSchema)