const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // El título es obligatorio
        trim: true // Remueve espacios en los extremos
    },
    description: {
        type: String,
        required: true, // La descripción es obligatoria
        trim: true
    },
    level: {
        type: Number,
        required: true, // Nivel obligatorio
        min: 0 // El nivel no puede ser negativo
    },
    category: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true // Por defecto, las habilidades son públicas
    },
    img: {
        type: String,
        required: false, // Imagen obligatoria
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|svg)$/.test(v); // Valida extensiones de imagen
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    icon: {
        type: String,
        required: false, // Icono obligatorio
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|svg)$/.test(v); // Valida extensiones de icono
            },
            message: props => `${props.value} is not a valid icon URL!`
        }
    }
},
    { timestamps: true }
);

const SkillSchema = mongoose.model('SkillSchema', skillSchema, 'skills')
const mySchemas = {'SkillSchema': SkillSchema};
module.exports = mySchemas;
