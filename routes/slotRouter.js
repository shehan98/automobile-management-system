const express = require('express');

const router = express.Router();

const slotController = require('../controllers/slotCtrl');

//get all slots
router.get('/', slotController.findAllSlots);

//get slot by id
router.get('/:id', slotController.findSlotById);

module.exports = router;