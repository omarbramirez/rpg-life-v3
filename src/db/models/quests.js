const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
        SXP:{
            type: Number,
            required: true,
            min: 0
        },
        CXP:{
            type: Number,
            required: true,
            min: 0
        },
    category: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true, 
        trim: true 
    },
    public: {
        type: Boolean,
        default: true 
    }
})

const QuestSchema = mongoose.model('QuestSchema', questSchema, 'quests' )
const mySchemas = { 'QuestSchema': QuestSchema}
module.exports = mySchemas;