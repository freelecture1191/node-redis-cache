const express = require('express');
const router = express.Router();
const ctrl = require('./users.ctrl')


/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.delete('/:id', ctrl.destroy)
router.post('/', ctrl.create)

module.exports = router;