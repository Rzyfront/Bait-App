const paymentsRoute = require('express').Router();

paymentsRoute.get('/mercadopago', (req, res) => res.json({ success: true }));

module.exports = paymentsRoute;
