const MerossCloud = require('meross-cloud');
const options = {
    email: process.env.MEROSS_EMAIL,
    password: process.env.MEROSS_PASSWORD,
    logger: console.log,
    localHttpFirst: true, // Try to contact the devices locally before trying the cloud
    onlyLocalForGet: true, // When trying locally, do not try the cloud for GET requests at all
    timeout: 3000, // Default is 3000
};

const meross = {};
meross.merossCloud = new MerossCloud(options);
meross.garageDevice = null;

// Make sure we logout when the server is killed.
const shutDown = () => {
    // TODO: test this. The idea is that tokens should be invalidated.
    meross.merossCloud.logout();
    process.exit(0);
};
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

module.exports = meross;
