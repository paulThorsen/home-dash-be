const ws = require('ws');
const meross = require('../services/meross');
const garageWebsocket = new ws.WebSocketServer({ noServer: true, path: '/garage/state' });

/**
 * Listen to and emit garage state to provided websocket.
 */
const listenToAndEmitState = (ws) => {
    // Create method that can be passed to listener and later be removed safely.
    const getAndEmitState = () => {
        meross.garageDevice.getSystemAllData((err, res) => {
            if (!res || err) ws.emit('error', 'Unable to get system data: ' + err);
            currentState = res?.all.digest.garageDoor[0];
            ws.send(JSON.stringify(currentState));
        });
    };
    // Emit initial state.
    getAndEmitState(ws);
    // Listen for future state.
    meross.garageDevice.on('data', getAndEmitState);
    // RM the listener for avoid memory leaks.
    ws.on('close', () => {
        meross.garageDevice.removeListener('data', getAndEmitState);
    });
};

// Upon connection, connect to Meross (if needed) and setup listeners for garage state.
garageWebsocket.on('connection', function connection(ws) {
    ws.on('error', console.error);

    // If there is already a device, no need to connect again.
    if (!meross.garageDevice) {
        meross.merossCloud.on('deviceInitialized', (deviceId, deviceDef, device) => {
            // Save the garage device for future reference.
            meross.garageDevice = device;
            device.on('connected', () => {
                console.log('DEV: ' + deviceId + ' connected');
                listenToAndEmitState(ws);
            });
        });
        // Make the connection
        meross.merossCloud.connect((error) => {
            if (error) console.log('connect error: ' + error);
        });
    } else {
        listenToAndEmitState(ws);
    }
});

module.exports = garageWebsocket;
