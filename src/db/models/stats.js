const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    totalPX:{
        type: Number,
        required: true, // Nivel obligatorio
        min: 0
    },
    level:{
        type: Number,
        required: true, // Nivel obligatorio
        min: 0
    },
    nextLevelPX:{
        type: Number,
        required: true, // Nivel obligatorio
        min: 0
    },
    img:{
        type: String,
        required: false, // Imagen obligatoria
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|svg)$/.test(v); // Valida extensiones de imagen
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    activeQuest:{
        type: String,
        required: true, // La descripción es obligatoria
        trim: true
    }
})

const StatsSchema = mongoose.model('StatsSchema', statsSchema, 'stats')
const mySchemas = {
    'StatsSchema': StatsSchema
};
module.exports = mySchemas;