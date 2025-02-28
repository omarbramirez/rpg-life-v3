const express = require('express');
const stats = express.Router();
const statsControllers = require('../controllers/statsControllers');

stats.get('/get-skill-list',statsControllers.getSkillList);
stats.get('/get-active-quest', statsControllers.getActiveQuest);
stats.get(`/get-user`,statsControllers.getUser)
stats.patch('/add-CXP-to-stats', statsControllers.addCXPToStats)
stats.patch('/add-SXP-to-skill', statsControllers.addSXPToSkill)
stats.patch('/level-up',statsControllers.levelUp)
stats.patch('/update-element',statsControllers.updateElement)

module.exports = stats