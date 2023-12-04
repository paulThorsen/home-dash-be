require('../utils/dotenv-control');
const axios = require('axios');

const apiBaseURI = `http://${process.env.ROKU_IP_ADDRESS}:8060`;

const turnOnTV = async () => {
    return sendHTTPRequest('PowerOn');
};

const switchInputToHDMI1 = async () => {
    return sendHTTPRequest('InputHDMI1');
};

const turnOffTV = async () => {
    return sendHTTPRequest('PowerOff');
};

const sendHTTPRequest = async (command) => {
    const options = {
        method: 'POST',
        url: `${apiBaseURI}/keypress/${command}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        return await axios(options);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { turnOnTV, switchInputToHDMI1, turnOffTV };
