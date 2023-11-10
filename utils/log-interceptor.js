interceptLogs = () => {
    const originalConsole = console;
    console = {};
    console.log = function () {
        originalConsole.log(getTimestamp(), ...arguments);
    };
    console.error = function () {
        originalConsole.error(getTimestamp(), ...arguments);
    };
    console.warn = function () {
        originalConsole.warn(getTimestamp(), ...arguments);
    };
    console.debug = function () {
        originalConsole.debug(getTimestamp(), ...arguments);
    };
};

getTimestamp = () => {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const dateString = new Date(Date.now() - offset * 60000).toISOString();

    const pad = (num) => num.toFixed().padStart(2, '0');
    const sign = Math.sign(offset) ? '-' : '+';
    const hour = pad(Math.floor(offset / 60));
    const minute = pad(offset % 60);

    return dateString.replace(/Z$/, `${sign}${hour}:${minute}`);
};

module.exports = interceptLogs;
