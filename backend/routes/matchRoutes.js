const express = require('express');
const router = express.Router();
const { 
    createMatch, 
    updateMatchResult,
    fullEditMatch, 
    getAllMatches, 
    deleteMatch,
    getDashboardStats
} = require('../controllers/matchController');

router.post('/create', createMatch);
router.put('/update-result/:matchId', updateMatchResult);
router.put('/edit/:matchId', fullEditMatch);
router.get('/all', getAllMatches);
router.get('/analytics', getDashboardStats);
router.delete('/delete/:matchId', deleteMatch);

module.exports = router;