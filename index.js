const dotenv = require('dotenv')
const Twit = require("twit");
const moment = require("moment");

dotenv.config({path:'./config.env'});

const client = new Twit({
    timeout_ms: 60 * 1000,
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

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