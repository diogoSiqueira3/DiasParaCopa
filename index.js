const Twit = require("twit");
const moment = require("moment");
const client = new Twit({
timeout_ms: 60 * 1000,
consumer_key: process.env.CONSUMER_KEY,
consumer_secret: process.env.CONSUMER_SECRET,
access_token: process.env.ACCESS_TOKEN,
access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

exports.handler = async () => { 
    
    let hoje = moment(new Date());
    let inicioCopa = moment("08/06/2026", "DD/MM/YYYY");
    let diferencaDias; 
    let tweet = null;
    
    if (hoje.isSame(inicioCopa, "day")) {
        diferencaDias = 0;
    } else {
        diferencaDias = inicioCopa.diff(hoje, "days") + 1;
    }
    
    if (diferencaDias > 1) {
        tweet = `Estamos a ${diferencaDias} dias para o início da copa do mundo de 2026!`;
    } else if (diferencaDias === 1) {
        tweet = 'Amanhã começa a copa do mundo de 2026!';
    } else if (diferencaDias === 0) {
        tweet = 'Hoje começa a copa do mundo de 2026!';
    }
    
    if (tweet) {
      await new Promise(resolve => client.post('statuses/update', { status: tweet }, resolve));
    }
    
};
