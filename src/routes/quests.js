const express = require('express')
const quests = express.Router()
const questsControllers = require('../controllers/questsControllers')

quests.get('/quests', questsControllers.getAllQuests)
quests.get('/get-active-quests', questsControllers.getActiveQuests)
quests.get('/get-completed-quests', questsControllers.getCompletedQuests)
quests.post('/add-quest', questsControllers.addOneQuest)
quests.delete('/delete-quest', questsControllers.deleteOneQuest)
quests.put('/update-quest', questsControllers.updateOneQuest)

module.exports = quests;


