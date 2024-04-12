const axios = require('axios');
const convert = require('xml-js');
const apiBaseURI = `http://${process.env.ROKU_IP_ADDRESS}:8060`;

const turnOnTV = async () => {
    return sendKeyPressCommand('PowerOn');
};

const switchInputToHDMI1 = async () => {
    return sendKeyPressCommand('InputHDMI1');
};

const switchInputToHDMI2 = async () => {
    return sendKeyPressCommand('InputHDMI2');
};

const turnOffTV = async () => {
    return sendKeyPressCommand('PowerOff');
};

const isTvOn = (info) => {
    const jsonObj = JSON.parse(convert.xml2json(info));
    const powerModeObj = jsonObj['elements'][0]['elements'].find(
        (el) => el['name'] === 'power-mode'
    );
    return powerModeObj['elements'][0]['text'] === 'PowerOn';
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

module.exports = { turnOnTV, switchInputToHDMI1, turnOffTV, getInfo, switchInputToHDMI2, isTvOn };
