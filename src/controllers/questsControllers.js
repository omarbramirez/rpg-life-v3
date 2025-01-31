const mySchemas = require('../db/models/quests');
const fieldFilters = require('../helpers/fieldFilters');

exports.getAllQuests = async (req, res) =>{
    try{
        const quests = await mySchemas.QuestSchema.find()
        res.status(200).json(quests);
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}

exports.getActiveQuests = async (req, res) =>{
    try{
        const activeQuests = await mySchemas.QuestSchema.find({status: 'In progress'})
        res.status(200).json(activeQuests);
    }catch(err){
        console.error("Error:", err);
        res.status(500).json({
            message: 'Internal server error. Please try again.'
        })
    }
}

exports.getCompletedQuests = async (req, res) =>{
    try{
        const completedQuests = await mySchemas.QuestSchema.find({status: 'Completed'})
        res.status(200).json(completedQuests);
    }catch(err){
        console.error("Error", err);
        res.status(500).json({
            message: 'Internal server error. Please try again'
        })
    }
}

exports.addOneQuest = async(req, res) =>{
    const {title, description, status, SXP, CXP, category, skill, public} = req.body
    try{
        const newQuest = { title, description, status, SXP, CXP, category, skill, public }
        console.log(newQuest)
        const newQuestCreated = await mySchemas.QuestSchema.create(newQuest)
        newQuestCreated.save()
        res.status(200).json(newQuest);
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}

exports.deleteOneQuest  = async(req, res) =>{
    const {title} = req.body 
    try{
        await mySchemas.QuestSchema.deleteOne({title: title})
        res.status(200).json(title);
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}

exports.updateOneQuest = async(req, res) =>{
    const title = req.body.title
    const allowedFields = ['new_title', 'description', 'status', 'SXP', 'CXP', 'category', 'skill', 'public']
    const update = fieldFilters.filterUpdateField(req.body, allowedFields)
    try{
        await mySchemas.QuestSchema.findOneAndUpdate({title: title}, update)
        res.status(200).json(title);
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}
