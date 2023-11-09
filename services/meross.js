if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const MerossCloud = require('meross-cloud');
const options = {
    email: process.env.MEROSS_EMAIL,
    password: process.env.MEROSS_PASSWORD,
    // logger: console.log,
    localHttpFirst: true, // Try to contact the devices locally before trying the cloud
    onlyLocalForGet: true, // When trying locally, do not try the cloud for GET requests at all
    timeout: 3000, // Default is 3000
};

const meross = new MerossCloud(options);

module.exports = meross;
