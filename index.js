require('dotenv').config();

const Twit = require("twit");
const config = require('./config');
const moment = require("moment");

const client = new Twit(config);

let aCada24h = 1000*60*1440

tuita();
setInterval(tuita, aCada24h);

function tuita() {
    let hoje = moment(new Date());
    let inicioCopa = moment("21/11/2022", "DD/MM/YYYY");
    let diferencaDias;
    let tweet = null;
    
    if (hoje.isSame(inicioCopa, "day")) {
        diferencaDias = 0;
    } else {
        diferencaDias = inicioCopa.diff(hoje, "days") + 1;
    }
    
    if (diferencaDias > 1) {
        tweet = `Estamos a ${diferencaDias} dias para o início da copa do mundo de 2022!`;
    } else if (diferencaDias === 1) {
        tweet = 'Amanhã começa a copa do mundo de 2022!';
    } else if (diferencaDias === 0) {
        tweet = 'Hoje começa a copa do mundo de 2022!';
    }

    client.post('statuses/update', { status: tweet }, function(err, data, response) {})    
}