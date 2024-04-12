const express = require('express');
const roku = require('../services/roku');
const router = express.Router();

/**
 * Turn on the TV and switch input to HDMI1.
 */
router.post('/on', async function (req, res, next) {
    await roku.turnOnTV();
    // Necessary to wait until next command can be supplied.
    await new Promise((resolve) => setTimeout(resolve, 4000));
    await roku.switchInputToHDMI1();
    console.log('TV turned on');
    res.send();
});

/**
 * Switch input to HDMI1.
 */
router.post('/hdmi1', async function (req, res, next) {
    await switchInput('HDMI1');
    res.send();
});

/**
 * Switch input to HDMI2.
 */
router.post('/hdmi2', async function (req, res, next) {
    await switchInput('HDMI2');
    res.send();
});

/**
 * Turn off the TV.
 */
router.post('/off', async function (req, res, next) {
    await roku.turnOffTV();
    console.log('TV turned off');
    res.send();
});

async function switchInput(input) {
    const info = await roku.getInfo();
    if (!roku.isTvOn(info)) {
        await roku.turnOnTV();
        // Necessary to wait until next command can be supplied.
        await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    await roku[`switchInputTo${input}`]();
    console.log(`Input switched to ${input}`);
}

module.exports = router;
