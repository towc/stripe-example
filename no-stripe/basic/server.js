const server = require('express')();

let cookies = 20;

server.get('/cookie/count', (req, res) => {
  res.send(cookies);
})

server.get('/cookie/buy', (req, res) => {
  console.log({ cookies }, 'someone asked to buy a cookie!');

  if (cookies === 0) {
    res.send('ERROR: no cookies left!');
  } else {
    cookies -= 1;

    // here you would send an email or initiate a shipment
    console.log({ cookies }, 'cookie bought!');
    
    res.send('you bought a cookie! Cookies left: ' + cookies);
  }
})

server.listen(3000, () => console.log('server is up! http://localhost:3000'));
