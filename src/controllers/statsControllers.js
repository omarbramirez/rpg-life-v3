const mySkillsSchemas = require('../db/models/skills')
const myQuestsSchemas = require('../db/models/quests')

const myStatsSchemas = require('../db/models/stats')

exports.getUser = async(req,res)=>{
    try{
        const user = await myStatsSchemas.StatsSchema.find();
        res.status(200).json(user[0]);
    }catch(err){
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error. Please try again later.' 
    })
}
}
exports.getSkillList =async(req, res)=>{
try{
    const skillsList= await mySkillsSchemas.SkillSchema.find().sort({createdAt: -1}).select('title').select('level'); 
    res.status(200).json(skillsList);
}catch(err){
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error. Please try again later.' 
    })
}
}

exports.getActiveQuest = async(req,res)=>{
    const title = req.query.title
    try{
        const activeQuest = await myQuestsSchemas.QuestSchema.find({title: title});
        res.status(200).json(activeQuest[0] )
    }catch(err){
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error. Please try again later.' 
    })
}
}

exports.addCXPToStats = async (req, res) => {
    const { CXP } = req.body.data;
    try {
       
        const filter = {name:
"Omar, el Arquitecto del Código Abismal"}; 
        const update = { $inc: { totalPX: CXP } }; 

        const updatedStats = await myStatsSchemas.StatsSchema.findOneAndUpdate(
            filter,
            update,
            { new: true } 
        );

        if (!updatedStats) {
            return res.status(404).json({ 
                message: 'Stats not found.' 
            });
        }

        res.status(200).json(updatedStats);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
};

exports.addSXPToSkill = async(req, res) => {
    const {SXP, skill} = req.body.data;
    console.log(SXP, skill)
    try{
        const filter = {title: skill}; 
                    const update = { $inc: { level: SXP } }; 
                    const updatedSkill = await mySkillsSchemas.SkillSchema.findOneAndUpdate(
                        filter,
                        update,
                        { new: true } 
                    );

                    if (!updatedSkill) {
                        return res.status(404).json({ 
                            message: 'Stats not found.' 
                        });
                    }
            
                    res.status(200).json(updatedSkill);
    }catch(err){
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error. Please try again later.' 
    })
}
}