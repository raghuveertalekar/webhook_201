const express = require('express');
const readme = require('readmeio');

const app = express();

// Your ReadMe secret
const secret = 'CJjif4vSlIWpHLiDKRdH3NgBPEcFolNK';

app.post('/webhook', express.json({ type: 'application/json' }), async (req, res) => {
  // Verify the request is legitimate and came from ReadMe.
  const signature = req.headers['readme-signature'];

  try {
    console.log('try');
    console.log(req.headers);
    //readme.verifyWebhook(req.body, signature, secret);
  } catch (e) {
    // Handle invalid requests
    return res.status(401).json({ error: e.message });
  }

  // Fetch the user from the database and return their data for use with OpenAPI variables.
  // const user = await db.find({ email: req.body.email })
  return res.json({
    // OAS Server variables
    'base-url': 'https://localhost:443',

    // OAS Security variables
    bearerAuth: 'bearerAuth',
    oauth2: 'oauth2',
    apiKey: { user: 'user', pass: 'pass' },
    APIToken: 'APIToken',
  });
});

const server = app.listen(8000, '0.0.0.0', () => {
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});

