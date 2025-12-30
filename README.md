inspired by: https://docs.stripe.com/payments/quickstart

# Install tools

to run javascript, we need `node` and `npm`.



# Basic javascript

Setting up our own package:

```bash
npm init
```

and press enter until it stops asking.

Every project is a package. You can't use other packages unless you are yourself a package.

## backend

Code that runs on a computer, with full access to it.

```bash
npm install --save express
```

```js
// server.js
const express = require('express');

// which path on the server
app.get('/hello', (req, res) => {

    // what to send back
    res.send('response!');
});

app.listen(80, () => console.log('server is running!'));
```

We can have some logic:

```js
// server.js
const express = require('express');

let counter = 0;

app.get('/hello', (req, res) => {
    counter += 1;
    res.send('counter is now: ' + counter)
})

app.listen(80, () => console.log('server is running!'));
```

## frontend

```js
```
