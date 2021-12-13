const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51Itn76AY7zpl2tqotBGt23IEZmOSCZOmOnpgAhVQWIvua4g5c4G74Au5P54rWqNofPUw1DZ7TdHzlBhCWJCJa81W00V76C7Z2n');

const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.post('/pay', async (req, res) => { 
  const price = req.query.price;
  const mode = req.query.mode;
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      payment_method_types: ['card'],
      line_items: [{
        name: 'Commande ',
        amount: price *100,
        currency: 'eur',
        quantity: 1,
      }],
      mode: 'payment',
    });
    res.status(200).send(session);
  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))