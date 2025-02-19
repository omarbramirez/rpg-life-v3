const express = require('express');
const skills = express.Router();
const skillsControllers = require('../controllers/skillsControllers');

skills.get('/skills-titles',skillsControllers.getAllSkillsTitles);
skills.get('/get-one-skill', skillsControllers.getOneSkill)
skills.get('/get-skills-number', skillsControllers.getSkillsNumber)
skills.get('/skills',skillsControllers.getOneSkill);
skills.post('/add-skill', skillsControllers.addOneSkill)
skills.delete('/delete-skill', skillsControllers.deleteOneSkill)
skills.patch('/update-skill', skillsControllers.updateOneSkill)

module.exports = skills;

