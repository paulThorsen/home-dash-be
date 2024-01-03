const axios = require('axios');

const apiBaseURI = `http://${process.env.ROKU_IP_ADDRESS}:8060`;

const turnOnTV = async () => {
    return sendKeyPressCommand('PowerOn');
};

const switchInputToHDMI1 = async () => {
    return sendKeyPressCommand('InputHDMI1');
};

const turnOffTV = async () => {
    return sendKeyPressCommand('PowerOff');
};

const sendKeyPressCommand = async (command) => {
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
        console.error(e);
    }
};

const getInfo = () => {
    const options = {
        method: 'GET',
        url: `${apiBaseURI}/query/device-info`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        return axios(options);
    } catch (e) {
        console.error(e);
    }
};

module.exports = { turnOnTV, switchInputToHDMI1, turnOffTV, getInfo };
