const rxjs = require('rxjs');
const convert = require('xml-js');
const ws = require('ws');
const roku = require('../services/roku');
const TVWebsocket = new ws.WebSocketServer({ noServer: true, path: '/tv/state' });
const tvStateSubject = new rxjs.BehaviorSubject(null);

// Upon connection, fire up the observable that will keep track of the state
TVWebsocket.on('connection', function connection(ws) {
    ws.on('error', console.error);
    // If we don't have a value yet, fire up the observable
    if (!tvStateSubject.value) {
        rxjs.interval(1000)
            .pipe(
                rxjs.switchMap(() => rxjs.from(roku.getInfo())),
                rxjs.map((res) => {
                    const jsonObj = JSON.parse(convert.xml2json(res.data));
                    const powerModeObj = jsonObj['elements'][0]['elements'].find(
                        (el) => el['name'] === 'power-mode'
                    );
                    return powerModeObj['elements'][0]['text'];
                })
            )
            .subscribe(tvStateSubject);
    }
    // Connect subject to ws
    const subcription = tvStateSubject.subscribe((state) => ws.send(state));
    // RM the subscription to avoid memory leaks
    ws.on('close', () => {
        subcription.unsubscribe();
    });
});

module.exports = TVWebsocket;
