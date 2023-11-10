const express = require('express');
const router = express.Router();
const meross = require('../services/meross');

/**
 * Open the garage door.
 */
router.post('/open', function (req, res, next) {
    meross.garageDevice.controlGarageDoor(1, true, (err, response) => {
        console.log('Garage opened: ' + err + ', res: ' + JSON.stringify(response));
        res.send();
    });
});

/**
 * Closes the garage door.
 */
router.post('/close', function (req, res, next) {
    meross.garageDevice.controlGarageDoor(1, false, (err, response) => {
        console.log('Garage closed: ' + err + ', res: ' + JSON.stringify(response));
        res.send();
    });
});

module.exports = router;
