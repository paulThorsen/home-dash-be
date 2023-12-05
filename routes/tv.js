const express = require('express');
const roku = require('../services/roku');
const router = express.Router();

/**
 * Turn on the TV and switch input to Apple TV.
 */
router.post('/on', async function (req, res, next) {
    await roku.turnOnTV();
    // Necessary to wait until next command can be supplied.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await roku.switchInputToHDMI1();
    res.send();
});

/**
 * Turn off the TV.
 */
router.post('/off', async function (req, res, next) {
    await roku.turnOffTV();
    res.send();
});

module.exports = router;
