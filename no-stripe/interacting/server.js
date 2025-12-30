const server = require('express')();

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

server.get('/cookie/buy', (req, res) => {
  // example of getting extra data from the browser
  const address = req.query.address;

  console.log({ cookies, address }, 'someone asked to buy a cookie!');

  if (!address) {
    res.send('ERROR: missing address!');
  } else if (cookies === 0) {
    res.send('ERROR: no cookies left!');
  } else {
    cookies -= 1;

    // here you would send an email or initiate a shipment
    console.log({ cookies, address}, 'cookie bought!');
    
    res.send('you bought a cookie! Cookies left: ' + cookies);
  }
})

server.listen(3000, () => console.log('server is up! http://localhost:3000'));
