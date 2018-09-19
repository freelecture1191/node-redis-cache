const express = require('express');
const router = express.Router();
const ctrl = require('./redis.ctrl');

router.post('/profile', ctrl.setProfile);
router.get('/profile/:name', ctrl.getProfile);

router.post('/queue', ctrl.createQueue);
router.post('/message/:message', ctrl.setMessage);
router.get('/message', ctrl.getMessage);
router.delete('/message/:id', ctrl.deleteMessage);
router.get('/queue',ctrl.getQueue)
module.exports = router;