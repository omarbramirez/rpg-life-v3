const mySchemas = require('../db/models/skills')
const fieldFilters = require('../helpers/fieldFilters');

exports.getAllSkillsTitles = async (req, res) =>{
    try{
        const skills = await mySchemas.SkillSchema.find().sort({createdAt: -1}).select('title'); 
        res.status(200).json(skills);
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}

exports.getOneSkill = async(req, res) => {
    const page = req.query.page
    try{
        const skill = await mySchemas.SkillSchema.find()
        .sort({createdAt: 1})
        .skip(page)
        .limit(1)
        res.status(200).json(skill);
    }catch(err){
        console.error('Error:', err)
        res.status(500).json({
            message:'Internal server error. Please try again later.'
        })
    }
}

exports.getSkillsNumber = async(req, res) =>{

    try{
        const total = await mySchemas.SkillSchema.estimatedDocumentCount()
        res.status(200).json({ total });
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}

exports.addOneSkill = async (req, res) =>{
    const { title, description, level, category, public, img, icon } = req.body;
    try{
        const newSkill = { title, description, level, category, public, img, icon };
        const newSkillCreated = await mySchemas.SkillSchema.create(newSkill);
        res.status(200).json({success: true});
    }catch(err){
        console.error('Error:', err); 
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.'
        });
    }
}

exports.deleteOneSkill = async (req, res) =>{
    const {title} = req.body;
    try{
         await mySchemas.SkillSchema.deleteOne({title: title})
         res.status(200).json({success: true});
    } catch(err){
        console.error('Error:', err); 
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.'
        });
    }
}

exports.updateOneSkill = async(req, res) => {
    const {title} = req.body.data;
    const allowedFields = ['new_title', 'description', 'level', 'category', 'public', 'img', 'icon']
    const update = fieldFilters.filterUpdateField(req.body.data, allowedFields)

    try{
        console.log(update)
        console.log(title)
        await mySchemas.SkillSchema.findOneAndUpdate({title:title},update)
        res.status(200).json({success: true});
    }catch(err){
        console.error('Error:', err); 
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.'
        });
    }
}
