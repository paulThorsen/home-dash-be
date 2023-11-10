const ws = require('ws');
const meross = require('../services/meross');
const garageWebsocket = new ws.WebSocketServer({ noServer: true, path: '/garage/state' });

garageWebsocket.on('connection', function connection(ws) {
    ws.on('error', console.error);

    meross.on('deviceInitialized', (deviceId, deviceDef, device) => {
        device.on('connected', () => {
            console.log('DEV: ' + deviceId + ' connected');

            device.getSystemAllData((err, res) => {
                if (!res || err) ws.emit('error', 'Unable to get system data: ' + err);
                // Send initial garage door state
                ws.send(JSON.stringify(res?.all.digest.garageDoor[0]));
            });
        });
    });

    // Make the connection
    meross.connect((error) => {
        if (error) console.log('connect error: ' + error);
    });
});

module.exports = garageWebsocket;
