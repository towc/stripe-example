const server = require('express')();
const stripe = require('stripe')('sk_test_51ScuUj6pLKtybe8N5peboP4GbV3pgxnOpAzEq4REVNcazXvTlzzYjIE14ObFMFtoh8kzfWoKuXumIxzzLrO12DsU00iNBlPcTQ');

let cookies = 20;

server.get('/', (req, res) => {
  // reading the file from the computer, and sending it over.
  // you don't need to understand this, but it's needed for the example.
  const html = require('fs').readFileSync(__dirname + '/browser.html', 'utf-8');

  res.send(html);
})

server.get('/cookie/count', (req, res) => {
  res.send(cookies);
})

// received as soon as the page with the payment form loads,
// to sync it up with stripe's internal payment tracking
server.get('/cookie/purchase-details', async (req, res) => {
  if (cookies === 0) {
    res.send('ERROR: no cookies left!');
  } else {
    // allow them to start buying the cookie, but don't buy yet!
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2_00,
      currency: 'usd',
    });
    
    res.send(paymentIntent.client_secret);
  }
})

// we didn't hook the webhook to anything yet
server.get('/webhook', (req, res) => {
  // https://docs.stripe.com/webhooks
  
  const event = stripe.webhooks.constructEvent(
    req.body,
    req.headers['stripe-signature'],
    'whsec_TODO',
  );

  if (event.type === 'payment_intent.succeeded') {
    // this would get triggered once the user pays.
    // The request is sent from stripe's servers, not our browser or anything else
    cookies -= 1;

    // here you would send an email or initiate a shipment
    console.log({ cookies, address}, 'cookie bought!');
  }
})

server.listen(3000, () => console.log('server is up! http://localhost:3000'));

