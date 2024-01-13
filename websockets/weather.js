const rxjs = require('rxjs');
const ws = require('ws');
const openWeather = require('../services/open-weather');
const weatherWebsocket = new ws.WebSocketServer({ noServer: true, path: '/weather' });
const weatherSubject = new rxjs.BehaviorSubject(null);

// Upon connection, fire up the observable that will keep track of the weather
weatherWebsocket.on('connection', function connection(ws) {
    ws.on('error', console.error);
    // Connect subject to ws
    const subcription = weatherSubject.subscribe((weather) => ws.send(JSON.stringify(weather)));
    // If we don't have a value yet, fire up the observable
    if (!weatherSubject.value) {
        rxjs.interval(600000)
            .pipe(
                rxjs.startWith(0),
                rxjs.switchMap(() => rxjs.from(openWeather.getWeather()))
            )
            .subscribe(weatherSubject);
    }
    // RM the subscription to avoid memory leaks
    ws.on('close', () => {
        subcription.unsubscribe();
    });
});

module.exports = weatherWebsocket;
